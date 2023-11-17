import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import { getAllTasks } from '../APIcalls/taskScript';
import { useAuthToken } from '../Context/AuthTokenProvider';
import { useRefresh } from '../Context/RefreshProvider';

const TaskListScreen = (props) => {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('All');
  const { refresh } = useRefresh();

  const { authToken } = useAuthToken();

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const data = await getAllTasks(authToken.split(';')[0]);
        setTasks(data); // Assuming the data returned is an array of tasks
      } catch (error) {
        console.error(error);
        // Handle the error, e.g., showing an alert or setting an error state
      }
    };
    if (authToken) {
      fetchTasks();
    }
  }, [authToken, refresh]);

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'All') return true;
    return task.category === filter;
  });

  // Function to render each task
  const renderTask = ({ item }) => (
    <TouchableOpacity
      style={styles.taskCard}
      onPress={() =>
        props.navigation.navigate('Details', { task: item, showAccept: true })
      }
    >
      <Text style={styles.taskTitle}>{item.title}</Text>
      <Text style={styles.taskCategory}>{item.category}</Text>
    </TouchableOpacity>
  );

  // Function to render the filter buttons
  const renderFilterButton = (title) => (
    <TouchableOpacity
      onPress={() => setFilter(title)}
      style={[
        styles.filterButton,
        filter === title && styles.selectedFilterButton,
      ]}
    >
      <Text style={styles.filterText}>{title}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={require('../assets/icon.png')} style={styles.logo} />
        <Text style={styles.headerTitle}>AskATask</Text>
      </View>
      <View style={styles.filterContainer}>
        {renderFilterButton('All')}
        {renderFilterButton('Academic')}
        {renderFilterButton('Nonacademic')}
      </View>
      <FlatList
        data={filteredTasks}
        renderItem={renderTask}
        keyExtractor={(item) => item._id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 40,
    flex: 1,
    backgroundColor: '#4a90e2',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  logo: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  headerTitle: {
    marginLeft: 10,
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  filterContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    justifyContent: 'space-around',
  },
  filterButton: {
    padding: 10,
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
  taskCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    marginVertical: 10,
    marginHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  taskTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  taskCategory: {
    fontSize: 14,
    color: '#a9a9a9',
  },
});

export default TaskListScreen;
