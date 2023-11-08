import React, { useEffect, useState } from "react";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import LoginProvider from "../Context/LoginProvider";
import LoginSignUpNavigator from "./LoginSignupNavigator";

const Tab = createMaterialBottomTabNavigator();

const MainNavigation =()=>{
  return(
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
}

export default MainNavigation;