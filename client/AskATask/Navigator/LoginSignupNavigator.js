import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import TaskListScreen from "../screens/TaskListScreen";

const Stack= createStackNavigator();
function MyStack(){
    return(
        <Stack.Navigator>
            <Stack.Screen 
                name='login'
                component={TaskListScreen}
                options={{
                    headerShown:false,
                }}
            />
            <Stack.Screen 
                name='signup'
                component={RegisterScreen}
                options={{
                    headerShown:false,
                }}
            />
        </Stack.Navigator>
    )
}

export default function LoginSignUpNavigator(){
    return <MyStack/>
}