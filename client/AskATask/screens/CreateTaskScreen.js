import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, SafeAreaView,Image } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

const CreateTaskScreen = () => {
  const [taskName, setTaskName] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState('Academic');
  const [startDate, setStartDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || startDate;
    setShowDatePicker(Platform.OS === 'ios');
    setStartDate(currentDate);
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
          placeholder="Enter task description"
          multiline
          numberOfLines={4} // Sets the initial number of lines
        />

        <Text style={styles.label}>Type:</Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.typeButton, type === 'Academic' && styles.selectedButton]}
            onPress={() => setType('Academic')}
          >
            <Text style={styles.buttonText}>Academic</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.typeButton, type === 'Non-Academic' && styles.selectedButton]}
            onPress={() => setType('Non-Academic')}
          >
            <Text style={styles.buttonText}>Non-Academic</Text>
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

        <TouchableOpacity style={styles.createButton} onPress={() => {}}>
          <Text style={styles.createButtonText}>Create Task</Text>
        </TouchableOpacity>
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
