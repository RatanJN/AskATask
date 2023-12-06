import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Text,
  Alert,
} from 'react-native';
import { registerUser } from '../APIcalls/authScript';
import { useRefresh } from '../Context/RefreshProvider';

const RegisterScreen = (props) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [number, setNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { refresh, setRefresh } = useRefresh();

  const handleRegister = async () => {
    if (!name.trim()) {
      Alert.alert('Error', 'Please enter your name');
      return;
    }

    // Email validation
    if (!email.trim()) {
      Alert.alert('Error', 'Email field cannot be empty');
      return;
    } else if (!email.includes('@bu.edu')) {
      Alert.alert('Error', 'Please use a BU email address');
      return;
    }

    // Phone number validation
    if (!number.trim()) {
      Alert.alert('Error', 'Please enter your phone number');
      return;
    } else if (number.length < 10) {
      // Basic length check, can be more complex
      Alert.alert('Error', 'Please enter a valid phone number');
      return;
    }

    // Password validation
    if (!password.trim()) {
      Alert.alert('Error', 'Please enter a password');
      return;
    } else if (password.length < 6) {
      // Example: minimum 6 characters
      Alert.alert('Error', 'Password should be at least 6 characters long');
      return;
    }

    // Confirm Password validation
    if (!confirmPassword.trim()) {
      Alert.alert('Error', 'Please confirm your password');
      return;
    } else if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    const payload = {
      name: name,
      bu_email: email.toLowerCase(),
      password: password,
      conpass: confirmPassword,
      phone_number: number,
    };

    try {
      const isSuccess = await registerUser(payload);
      if (isSuccess) {
        setRefresh(!refresh);
        Alert.alert('Registered Successfully');
        props.navigation.goBack();
      } else {
        Alert.alert('Error', 'Registration failed. Please try again.');
      }
    } catch (error) {
      console.error('Error during registration:', error);
      Alert.alert(
        'Registration Error',
        error.message || 'An error occurred. Please try again.'
      );
    }
  };

  const backButton = () => {
    props.navigation.navigate('login');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to AskATask</Text>

      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        style={styles.input}
        placeholder="Phone number"
        value={number}
        onChangeText={setNumber}
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry={true}
        value={password}
        onChangeText={setPassword}
      />

      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        secureTextEntry={true}
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />

      <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
        <Text style={styles.registerButtonText}>Register</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => backButton()}>
        <Text style={styles.linkText}>Back</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 40,
    backgroundColor: '#4a90e2',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 40,
    color: '#FFF',
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 25,
    paddingHorizontal: 20,
    marginBottom: 20,
    backgroundColor: '#FFF',
    fontSize: 16,
  },
  registerButton: {
    height: 50,
    borderRadius: 25,
    backgroundColor: '#34A853',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2, // for Android shadow
    shadowColor: '#000', // for iOS shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  registerButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '500',
  },
  linkText: {
    paddingTop: 5,
    alignSelf: 'center',
    color: '#FFF',
    fontSize: 16,
    textDecorationLine: 'underline',
  },
});

export default RegisterScreen;
