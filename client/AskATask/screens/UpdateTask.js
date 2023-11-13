import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Image,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Ionicons from 'react-native-vector-icons/Ionicons';

const UpdateTask = ({ navigation, route }) => {
  const { taskDetails, userInfo } = route.params;

  const [taskName, setTaskName] = useState(taskDetails.title);
  const [description, setDescription] = useState(taskDetails.description);
  const [category, setCategory] = useState(taskDetails.category); // New state for category
  const [startDate, setStartDate] = useState(new Date(taskDetails.startDate));
  const [showDatePicker, setShowDatePicker] = useState(false);

  const onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || startDate;
    setShowDatePicker(false);
    setStartDate(currentDate);
  };

  const updateTaskDetails = () => {
    // Update logic goes here
  };

  const reopenTask = () => {
    // Logic for reopening the task goes here
  };

  const completeTask = () => {
    // Logic for marking the task as completed goes here
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
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
              style={[styles.categoryButton, category === 'Academic' && styles.selectedCategory]}
              onPress={() => setCategory('Academic')}
            >
              <Text style={styles.categoryText}>Academic</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.categoryButton, category === 'Non-Academic' && styles.selectedCategory]}
              onPress={() => setCategory('Non-Academic')}
            >
              <Text style={styles.categoryText}>Non-Academic</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.label}>Start Date:</Text>
          <TouchableOpacity
            style={styles.input}
            onPress={() => setShowDatePicker(true)}>
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

          <Text style={styles.label}>Accepted By:</Text>
          <Text style={styles.userInfoText}>Name: {userInfo.name}</Text>
          <Text style={styles.userInfoText}>Email: {userInfo.email}</Text>
          <Text style={styles.userInfoText}>Mobile: 6504479230</Text>
          <TouchableOpacity style={styles.button} onPress={updateTaskDetails}>
            <Text style={styles.buttonText}>Save Changes</Text>
          </TouchableOpacity>

          <View style={styles.actionButtonsContainer}>
            <TouchableOpacity style={styles.actionButton} onPress={reopenTask}>
              <Text style={styles.actionButtonText}>Reopen Task</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton} onPress={completeTask}>
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
    padding:25
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
