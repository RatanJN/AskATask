import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Image,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { acceptTaskById } from '../APIcalls/taskScript';
import { useAuthToken } from '../Context/AuthTokenProvider';
import { useRefresh } from '../Context/RefreshProvider';
import { Alert } from 'react-native';
import { fetchCreatorDetails } from '../APIcalls/userScript';

const TaskDetailScreen = ({ route, navigation }) => {
  const { authToken } = useAuthToken();
  const { refresh, setRefresh } = useRefresh();
  const { task, showAccept } = route.params;
  const [userDetails, setUserDetails] = useState(null);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const formattedDate = formatDate(task.task_date);

  const handleAcceptTask = async (taskId) => {
    const token = authToken.split(';')[0];
    try {
      const success = await acceptTaskById(taskId, token);
      if (success) {
        setRefresh(!refresh);
        navigation.goBack();
      }
    } catch (error) {
      // Error handling
      Alert.alert('Error', 'Cannot accept your own task!');
    }
  };

  useEffect(() => {
    if (task.created_by) {
      fetchCreatorDetails(task.created_by, authToken.split(';')[0]).then(
        (details) => {
          setUserDetails(details);
        }
      );
    }
  }, [task]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Task Details</Text>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.container} // Apply the layout styles here
      >
        <View style={styles.card}>
          {/* Task Image */}
          <Image
            source={require('../assets/TodoImage.png')}
            style={styles.taskImage}
          />
          {userDetails ? (
            <>
              <Text style={styles.title}>{task.title}</Text>
              <Text style={styles.dateStyle}>Start Date: {formattedDate}</Text>
              <Text style={styles.category}>Category: {task.category}</Text>
              <Text style={styles.description}>
                Description: {task.description}
              </Text>
              <Text style={styles.category}>Created By:</Text>
              <Text style={styles.description}>Name: {userDetails.name}</Text>
              <Text style={styles.description}>
                Mobile: {userDetails.phone_number}
              </Text>
              <Text style={styles.description}>
                Email: {userDetails.bu_email}
              </Text>
            </>
          ) : (
            // Optionally, render a placeholder or loading indicator here
            <Text>Loading user details...</Text>
          )}

          {showAccept && (
            <TouchableOpacity
              style={styles.acceptButton}
              onPress={() => handleAcceptTask(task._id)}
            >
              <Text style={styles.buttonText}>Accept Task</Text>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#4a90e2',
    paddingTop: 25,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#4a90e2',
  },
  backButton: {
    marginLeft: 10,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginLeft: 20,
  },
  scrollView: {
    flex: 1,
  },
  container: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 20,
  },
  card: {
    marginTop: 20,
    padding: 20,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowColor: '#000',
    shadowOffset: { height: 0, width: 0 },
    width: '100%',
  },
  taskImage: {
    width: '100%', // Take up all container width
    height: 250, // Fixed height for the image
    borderRadius: 10, // Round the corners
    marginBottom: 20, // Add some margin below the image
  },
  dateStyle: {
    fontSize: 16,
    color: 'gray',
    marginBottom: 10,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  category: {
    fontSize: 18,
    color: '#666',
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    color: '#333',
    marginBottom: 20,
  },
  acceptButton: {
    backgroundColor: '#5cb85c',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default TaskDetailScreen;
