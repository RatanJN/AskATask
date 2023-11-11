import React, { useEffect, useState } from "react";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import {useLogin} from "../Context/LoginProvider";
import { TaskScreenNavigator } from "./TaskScreenNavigator";
import LoginSignUpNavigator from "./LoginSignupNavigator";

const Tab = createMaterialBottomTabNavigator();

const MainNavigation =()=>{
  const { isLoggedIn, setIsLoggedIn } = useLogin();

  return isLoggedIn?(
    <Tab.Navigator initialRouteName="Tasks" activeColor="black">
      <Tab.Screen
        name="Tasks"
        component={TaskScreenNavigator}
        options={{
          tabBarLabel: 'Tasks',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="check-circle-outline" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Task"
        component={TaskScreenNavigator}
        options={{
          tabBarLabel: 'Task',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="check-circle-outline" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  ):(<Tab.Navigator initialRouteName="Login" activeColor="black">
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
</Tab.Navigator>);
}

export default MainNavigation;