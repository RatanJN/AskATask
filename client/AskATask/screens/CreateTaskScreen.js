import React, { useState } from 'react';
import {
  Alert,
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Image,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useAuthToken } from '../Context/AuthTokenProvider';
import { createNewTask } from '../APIcalls/taskScript';
import { useRefresh } from '../Context/RefreshProvider';

const CreateTaskScreen = ({ navigation }) => {
  const { authToken } = useAuthToken();
  const [taskName, setTaskName] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState('Academic');
  const [startDate, setStartDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const { refresh, setRefresh } = useRefresh();

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || startDate;
    setShowDatePicker(Platform.OS === 'ios');
    setStartDate(currentDate);
  };

  const handleCreateTask = async () => {
    const token = authToken.split(';')[0]; // Get the token
    const taskData = {
      title: taskName,
      description: description,
      category: type,
      task_date: startDate.toISOString(),
    };
    try {
      const data = await createNewTask(taskData, token);
      // Navigate back to the previous screen
      navigation.goBack();
      setRefresh(!refresh);
    } catch (error) {
      console.error('Error creating task:', error);
      // Show an error message
      Alert.alert('Error', 'Failed to create task. Please try again.');
    }
  };
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Image source={require('../assets/icon.png')} style={styles.logo} />
        <Text style={styles.headerTitle}>Create New Task</Text>
      </View>

      <View style={styles.formContainer}>
        <Text style={styles.label}>Task Name:</Text>
        <TextInput
          style={styles.input}
          onChangeText={setTaskName}
          value={taskName}
          placeholder="Enter task name"
        />

        <Text style={styles.label}>Description:</Text>
        <TextInput
          style={styles.inputDescription}
          onChangeText={setDescription}
          value={description}
          placeholder="Please describe your task in detail."
          multiline
          numberOfLines={4} // Sets the initial number of lines
        />

        <Text style={styles.label}>Type:</Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[
              styles.typeButton,
              type === 'Academic' && styles.selectedButton,
            ]}
            onPress={() => setType('Academic')}
          >
            <Text style={styles.buttonText}>Academic</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.typeButton,
              type === 'Nonacademic' && styles.selectedButton,
            ]}
            onPress={() => setType('Nonacademic')}
          >
            <Text style={styles.buttonText}>Nonacademic</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.label}>Task Date:</Text>
        <TouchableOpacity
          style={styles.datePickerButton}
          onPress={() => setShowDatePicker(true)}
        >
          <Text style={styles.buttonText}>
            {startDate.toLocaleDateString()}
          </Text>
        </TouchableOpacity>

        {showDatePicker && (
          <DateTimePicker
            value={startDate}
            mode="date"
            display="default"
            onChange={handleDateChange}
          />
        )}

        <TouchableOpacity
          style={styles.createButton}
          onPress={handleCreateTask}
        >
          <Text style={styles.buttonText}>Create Task</Text>
        </TouchableOpacity>
      </View>
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
    padding: 10,
    backgroundColor: '#4a90e2',
    alignItems: 'center',
  },
  headerTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  logo: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  formContainer: {
    padding: 20,
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: 20,
    flex: 1,
  },
  label: {
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
  },
  input: {
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 10,
    marginBottom: 15,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  typeButton: {
    flex: 1,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    marginHorizontal: 5,
    backgroundColor: '#f0f0f0',
  },
  selectedButton: {
    backgroundColor: '#4a90e2',
    borderColor: '#4a90e2',
  },
  buttonText: {
    textAlign: 'center',
    color: '#333',
    fontSize: 16,
    fontWeight: 'bold',
  },
  datePickerButton: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    backgroundColor: '#f0f0f0',
    marginBottom: 15,
    alignItems: 'center',
  },
  createButton: {
    backgroundColor: '#5cb85c',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 15,
  },
  createButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  inputDescription: {
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 10,
    marginBottom: 15,
    textAlignVertical: 'top', // Align text at the top on Android
    minHeight: 80, // Set a minimum height for the description box
  },
});

export default CreateTaskScreen;
