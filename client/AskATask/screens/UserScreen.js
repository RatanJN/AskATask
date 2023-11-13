import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, FlatList,Image } from 'react-native';

// Dummy data for tasks
const tasks = [
  { id: '1', title: 'Math Homework', category: 'Academic' },
  { id: '2', title: 'English Essay', category: 'Academic' },
  // ...other tasks
];

const UserDetailsScreen = () => {
  const [activeTab, setActiveTab] = useState('Created');

  // Function to render each task
  const renderTask = ({ item }) => (
    <TouchableOpacity style={styles.taskCard} >
      <Text style={styles.taskTitle}>{item.title}</Text>
      <Text style={styles.taskCategory}>{item.category}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Image source={require('../assets/icon.png')} style={styles.logo} />
        <Text style={styles.headerTitle}>User Details</Text>
      </View>
      
      <View style={styles.filterContainer}>
        <TouchableOpacity
          onPress={() => setActiveTab('Created')}
          style={[styles.filterButton, activeTab === 'Created' && styles.selectedFilterButton]}
        >
          <Text style={styles.filterText}>Created</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setActiveTab('Accepted')}
          style={[styles.filterButton, activeTab === 'Accepted' && styles.selectedFilterButton]}
        >
          <Text style={styles.filterText}>Accepted</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={tasks}
        renderItem={renderTask}
        keyExtractor={(item) => item.id}
        style={styles.list}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4a90e2', // Keeping the background color consistent
    paddingTop:25
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
