import React, { useEffect, useState } from "react";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useLogin } from "../Context/LoginProvider";
import { useAuthToken } from "../Context/AuthTokenProvider";
import { TaskScreenNavigator } from "./TaskScreenNavigator";
import { UserNavigator } from "./UserNavigator";
import LoginSignUpNavigator from "./LoginSignupNavigator";
import { CreateTaskNavigator } from "./CreateTaskNavigator";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { loginUser } from "../APIcalls/authScript";
import { Alert } from "react-native";

const Tab = createMaterialBottomTabNavigator();

const MainNavigation = () => {
  const { isLoggedIn, setIsLoggedIn } = useLogin();
  const { setAuthToken } = useAuthToken();

  const handleLogin = async () => {
    try {
      const signedIn = (await AsyncStorage.getItem("signedIn")) || "false";
      if (signedIn === "true") {
        const email = (await AsyncStorage.getItem("email")) || "";
        const password = (await AsyncStorage.getItem("pwd")) || "";
        const response = await loginUser({
          bu_email: email,
          password: password,
        });
        const data = await response.json();
        if (Object.keys(data).includes("message")) {
          setIsLoggedIn(true); // Set logged in state
          setAuthToken(response.headers.map["set-cookie"].substring(6));
        } else {
          setIsLoggedIn(false);
          Alert.alert("Login Failed", "Incorrect credentials");
        }
      } else {
        setIsLoggedIn(false);
      }
      // Navigate to the next screen or perform other actions on successful login
    } catch (error) {
      // If login fails, display an error
      setIsLoggedIn(false);
      Alert.alert(
        "Login Failed",
        error.response?.data?.error || "An error occurred"
      );
    }
  };

  useEffect(() => {
    handleLogin();
  }, []);

  return isLoggedIn ? (
    <Tab.Navigator initialRouteName="Tasks" activeColor="black">
      <Tab.Screen
        name="Tasks"
        component={TaskScreenNavigator}
        options={{
          tabBarLabel: "Tasks",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="check-circle-outline"
              color={color}
              size={26}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Create"
        component={CreateTaskNavigator}
        options={{
          tabBarLabel: "Create Task",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="plus" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={UserNavigator}
        options={{
          tabBarLabel: "My Profile",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="account" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  ) : (
    <Tab.Navigator initialRouteName="Login" activeColor="black">
      <Tab.Screen
        name="Login"
        component={LoginSignUpNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="account-key"
              color={color}
              size={26}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default MainNavigation;
