import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Image } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const TaskDetailScreen = ({ route, navigation }) => {
  const { task } = route.params;

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Task Details</Text>
      </View>

      <View style={styles.container}>
        <View style={styles.card}>
          {/* Task Image */}
          <Image source={require('../assets/TodoImage.png')} style={styles.taskImage} />

          <Text style={styles.title}>{task.title}</Text>
          <Text style={styles.category}>{task.category}</Text>
          <Text style={styles.description}>Here's a detailed description of the task. You can put any additional information needed for the user to understand what the task is about.</Text>

          {/* Accept Task Button */}
          <TouchableOpacity style={styles.acceptButton}>
            <Text style={styles.buttonText}>Accept Task</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#4a90e2',
    paddingTop:25
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
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 20,
    backgroundColor: '#4a90e2',
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
