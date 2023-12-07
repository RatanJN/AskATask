import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useAuthToken } from '../Context/AuthTokenProvider';
import { updateTaskById, closeTaskById } from '../APIcalls/taskScript';
import { useRefresh } from '../Context/RefreshProvider';
import { fetchCreatorDetails } from '../APIcalls/userScript';
import { Alert } from 'react-native';

const UpdateTask = ({ navigation, route }) => {
  const { authToken } = useAuthToken();
  const { refresh, setRefresh } = useRefresh();
  const { taskDetails, userInfo } = route.params;

  const [taskName, setTaskName] = useState(taskDetails.title);
  const [description, setDescription] = useState(taskDetails.description);
  const [category, setCategory] = useState(taskDetails.category); // New state for category
  const [userDetails, setUserDetails] = useState(null);

  const getInitialDate = () => {
    if (taskDetails.startDate && !isNaN(Date.parse(taskDetails.startDate))) {
      return new Date(taskDetails.startDate);
    }
    return new Date();
  };

  const [startDate, setStartDate] = useState(getInitialDate());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || startDate;
    setShowDatePicker(false);
    setStartDate(currentDate);
  };

  const updateTaskDetails = async () => {
    const payload = {
      title: taskName,
      description: description,
      category: category,
      task_date: startDate.toISOString(), // Ensure the date is in the correct format
    };

    try {
      const data = await updateTaskById(
        taskDetails._id,
        payload,
        authToken.split(';')[0]
      );
      setRefresh(!refresh);
      navigation.goBack();
    } catch (error) {
      console.error('Error updating task:', error);
      alert(error.message || 'An error occurred. Please try again.');
    }
  };

  const reopenTask = async () => {
    if (taskDetails.status === 'Open') {
      alert('Task is already open!');
      return;
    }
    const payload = {
      status: 'Open',
    };
    try {
      const data = await updateTaskById(
        taskDetails._id,
        payload,
        authToken.split(';')[0]
      );
      setRefresh(!refresh);
      Alert.alert('Task Reopened', 'The task has been successfully reopened.', [
        {
          text: 'OK',
          onPress: () => navigation.goBack(),
        },
      ]);
    } catch (error) {
      console.error('Error updating task:', error);
      alert(error.message || 'An error occurred. Please try again.');
    }
  };

  const completeTask = async () => {
    Alert.alert(
      'Confirm Closure',
      'Are you sure you want to close this task?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Task closure cancelled'),
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: async () => {
            try {
              const data = await closeTaskById(
                taskDetails._id,
                authToken.split(';')[0]
              );
              setRefresh(!refresh);
              navigation.goBack();
            } catch (error) {
              console.error('Error updating task:', error);
              alert(error.message || 'An error occurred. Please try again.');
            }
          },
        },
      ]
    );
  };

  useEffect(() => {
    if (taskDetails.status === 'Active') {
      fetchCreatorDetails(
        taskDetails.accepted_by,
        authToken.split(';')[0]
      ).then((details) => {
        setUserDetails(details);
      });
    }
  }, [taskDetails]);
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            <Ionicons name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Update Task</Text>
        </View>

        <View style={styles.form}>
          <Text style={styles.label}>Task Name:</Text>
          <TextInput
            style={styles.input}
            value={taskName}
            onChangeText={setTaskName}
            placeholder="Task Name"
          />

          <Text style={styles.label}>Description:</Text>
          <TextInput
            style={[styles.input, styles.multilineInput]}
            value={description}
            onChangeText={setDescription}
            multiline
            placeholder="Description"
            numberOfLines={4}
          />

          <Text style={styles.label}>Category:</Text>
          <View style={styles.categoryContainer}>
            <TouchableOpacity
              style={[
                styles.categoryButton,
                category === 'Academic' && styles.selectedCategory,
              ]}
              onPress={() => setCategory('Academic')}
            >
              <Text style={styles.categoryText}>Academic</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.categoryButton,
                category === 'Nonacademic' && styles.selectedCategory,
              ]}
              onPress={() => setCategory('Nonacademic')}
            >
              <Text style={styles.categoryText}>Nonacademic</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.label}>Start Date:</Text>
          <TouchableOpacity
            style={styles.input}
            onPress={() => setShowDatePicker(true)}
          >
            <Text style={styles.dateText}>{startDate.toDateString()}</Text>
          </TouchableOpacity>
          {showDatePicker && (
            <DateTimePicker
              value={startDate}
              mode="date"
              display="default"
              onChange={onDateChange}
            />
          )}
          {taskDetails.status === 'Open' ? (
            <Text style={styles.label}>
              This task has not been accepted by anyone yet!
            </Text>
          ) : userDetails ? (
            <>
              <Text style={styles.label}>Accepted By:</Text>
              <Text style={styles.userInfoText}>Name: {userDetails.name}</Text>
              <Text style={styles.userInfoText}>
                Email: {userDetails.bu_email}
              </Text>
              <Text style={styles.userInfoText}>
                Mobile: {userDetails.phone_number}
              </Text>
            </>
          ) : (
            <Text style={styles.label}>Loading user details...</Text>
          )}

          <View style={styles.actionButtonsContainer}>
            <TouchableOpacity
              style={styles.fullWidthButton}
              onPress={updateTaskDetails}
            >
              <Text style={styles.buttonText}>Save Changes</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.actionButtonsContainer}>
            <TouchableOpacity style={styles.actionButton} onPress={reopenTask}>
              <Text style={styles.actionButtonText}>Reopen Task</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={completeTask}
            >
              <Text style={styles.actionButtonText}>Close Task</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#4a90e2',
    padding: 25,
  },
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#4a90e2',
    paddingVertical: 10,
  },
  backButton: {
    position: 'absolute',
    left: 10,
    top: 10,
    zIndex: 10,
  },
  logo: {
    width: 50,
    height: 50,
    borderRadius: 25,
    position: 'absolute',
    left: 20,
    top: 10,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
  },
  form: {
    padding: 20,
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  input: {
    backgroundColor: '#f0f0f0',
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    borderRadius: 10,
    marginBottom: 15,
    fontSize: 16,
  },
  multilineInput: {
    minHeight: 100,
  },
  dateText: {
    fontSize: 16,
  },
  userInfoText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#4a90e2',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  actionButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  actionButton: {
    flex: 1,
    padding: 15,
    margin: 5,
    borderRadius: 10,
    alignItems: 'center',
    backgroundColor: '#5cb85c',
  },
  actionButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  fullWidthButton: {
    backgroundColor: '#4a90e2',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 10,
    width: '100%', // Full width
  },
  categoryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  categoryButton: {
    flex: 1,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    backgroundColor: '#f0f0f0',
    marginHorizontal: 5,
    alignItems: 'center',
  },
  selectedCategory: {
    backgroundColor: '#4a90e2',
    borderColor: '#4a90e2',
  },
  categoryText: {
    color: '#333',
    fontWeight: 'bold',
  },
});

export default UpdateTask;
