import React, { useEffect, useState } from "react";
import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import {useLogin} from "../Context/LoginProvider"
import { View ,Text} from "react-native";

//Stacks
import LoginProvider from "../Context/LoginProvider";

const Tab = createMaterialBottomTabNavigator();

const Main = () => {
 const isLoggedIn=useLogin();
 return isLoggedIn?(
    <View>
        <Text>Hello</Text>
    </View>
 ):(
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

export default Main;