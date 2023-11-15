import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  Image,
} from 'react-native';
import { getUserDetails } from '../APIcalls/userScript';
import { useAuthToken } from '../Context/AuthTokenProvider';

const UserDetailsScreen = (props) => {
  const { authToken } = useAuthToken();
  const [userDetails, setUserDetails] = useState([]);
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const data = await getUserDetails(authToken.split(';')[0]);
        setUserDetails(data); // Set the user details with the fetched data
      } catch (error) {
        console.error(error);
        // Handle the error, e.g., showing an alert or setting an error state
      }
    };
    if (authToken) {
      fetchUserDetails();
    }
  }, [authToken]);

  const [activeTab, setActiveTab] = useState('Created');
  const user = {
    name: 'Ratan J Naik',
    email: 'hshsjjsa',
  };

  const callScreen = (item) => {
    if (activeTab == 'Created') {
      props.navigation.navigate('Update Screen', {
        taskDetails: item,
        userInfo: user,
      });
    } else {
      props.navigation.navigate('TaskDetail Screen', {
        task: item,
        showAccept: false,
      });
    }
  };

  // Function to render each task
  const renderTask = ({ item }) =>
    activeTab === 'Created' && item.status === 'Closed' ? (
      <View style={styles.closedTaskCard}>
        <Text style={styles.taskTitle}>{item.title}</Text>
        <Text style={styles.taskCategory}> Closed </Text>
      </View>
    ) : (
      <TouchableOpacity
        style={styles.taskCard}
        onPress={() => callScreen(item)}
      >
        <Text style={styles.taskTitle}>{item.title}</Text>
        <Text style={styles.taskCategory}>{item.category}</Text>
      </TouchableOpacity>
    );

  const taskData =
    activeTab === 'Created'
      ? userDetails.tasks_created
      : userDetails.tasks_accepted;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Image source={require('../assets/icon.png')} style={styles.logo} />
        <Text style={styles.headerTitle}>User Details</Text>
      </View>

      <View style={styles.filterContainer}>
        <TouchableOpacity
          onPress={() => setActiveTab('Created')}
          style={[
            styles.filterButton,
            activeTab === 'Created' && styles.selectedFilterButton,
          ]}
        >
          <Text style={styles.filterText}>Created</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setActiveTab('Accepted')}
          style={[
            styles.filterButton,
            activeTab === 'Accepted' && styles.selectedFilterButton,
          ]}
        >
          <Text style={styles.filterText}>Accepted</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={taskData}
        renderItem={renderTask}
        keyExtractor={(item) => item._id} // Change to _id, which is the unique identifier from the database
        style={styles.list}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4a90e2', // Keeping the background color consistent
    paddingTop: 25,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#4a90e2',
    paddingVertical: 10,
  },
  logo: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#4a90e2',
    paddingVertical: 10,
  },
  filterButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'white',
  },
  selectedFilterButton: {
    backgroundColor: 'white',
  },
  filterText: {
    color: 'black',
    fontWeight: 'bold',
  },
  list: {
    backgroundColor: '#4a90e2', // Keeping the list background color consistent
  },
  taskCard: {
    backgroundColor: '#fff',
    padding: 20,
    marginHorizontal: 20,
    marginVertical: 10,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  closedTaskCard: {
    backgroundColor: '#fff',
    padding: 20,
    marginHorizontal: 20,
    marginVertical: 10,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  taskTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333', // Text color for better readability
  },
  taskCategory: {
    fontSize: 14,
    color: '#666',
  },
});

export default UserDetailsScreen;
