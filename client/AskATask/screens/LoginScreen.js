import React, { useState } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Text,
  Alert,
} from "react-native";
import { useLogin } from "../Context/LoginProvider";
import { loginUser } from "../APIcalls/authScript";

const LoginScreen = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { isLoggedIn, setIsLoggedIn } = useLogin(); // This is how you use useLogin

  const handleLogin = async () => {
    try {
      const data = await loginUser({ bu_email: email, password: password });
      setIsLoggedIn(true); // Set logged in state
      Alert.alert("Login successful!", data.message);
      // Navigate to the next screen or perform other actions on successful login
    } catch (error) {
      // If login fails, display an error
      Alert.alert(
        "Login Failed",
        error.response?.data?.error || "An error occurred"
      );
    }
  };

  const signupPage = () => {
    props.navigation.navigate("signup");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to AskATask!</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry={true}
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>Login</Text>
      </TouchableOpacity>

      <View style={styles.linksContainer}>
        <TouchableOpacity onPress={() => signupPage()}>
          <Text style={styles.linkText}>Signup</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => signupPage()}>
          <Text style={styles.linkText}>Forgot Password?</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 40,
    backgroundColor: "#4a90e2",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 40,
    color: "#FFF",
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 25,
    paddingHorizontal: 20,
    marginBottom: 20,
    backgroundColor: "#FFF",
    fontSize: 16,
  },
  loginButton: {
    height: 50,
    borderRadius: 25,
    backgroundColor: "#34A853",
    justifyContent: "center",
    alignItems: "center",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  loginButtonText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "500",
  },
  linksContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  linkText: {
    color: "#FFF",
    fontSize: 16,
    textDecorationLine: "underline",
  },
});

export default LoginScreen;
