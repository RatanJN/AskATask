import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView, Image } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const TaskDetailScreen = ({ route, navigation }) => {
  const { task, showAccept } = route.params;

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
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
          <Image source={require('../assets/TodoImage.png')} style={styles.taskImage} />

          <Text style={styles.title}>{task.title}</Text>
          <Text style={styles.category}>{task.category}</Text>
          <Text style={styles.description}>{task.startDate}</Text>
          <Text style={styles.description}>
            Here's a detailed description of the task. You can put any additional information needed for the user to understand what the task is about.
          </Text>
          <Text style={styles.category}>Created By:</Text>
          <Text style={styles.description}>Name: Ratan J Naik</Text>
          <Text style={styles.description}>Mobile: 6504479230</Text>
          <Text style={styles.description}>Email: ratanjn@bu.edu</Text>
          
          {showAccept && (
            <TouchableOpacity style={styles.acceptButton}>
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
