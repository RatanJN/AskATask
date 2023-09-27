import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { createAppContainer } from "react-navigation";
import { createMaterialBottomTabNavigator } from
    "react-navigation-material-bottom-tabs";

import HomeScreen from "./screens/HomeScreen ";
import SettingScreen from "./screens/SettingScreen";
import UserScreen from "./screens/UserScreen";
  
const TabNavigator = createMaterialBottomTabNavigator(
  {
    Home: {
      screen: HomeScreen,
      navigationOptions: {
        tabBarLabel: "Home",
        tabBarIcon: (tabInfo) => (
          <Ionicons
            name="md-home"
            size={tabInfo.focused ? 26 : 20}
            color={tabInfo.tintColor}
          />
        ),
      },
    },
    User: {
      screen: UserScreen,
      navigationOptions: {
        tabBarLabel: "User",
        tabBarIcon: (tabInfo) => (
          <Ionicons
            name="md-person-circle-outline"
            size={tabInfo.focused ? 26 : 20}
            color={tabInfo.tintColor}
          />
        ),
      },
    },
    Setting: {
      screen: SettingScreen,
      navigationOptions: {
        tabBarLabel: "Setting",
        tabBarIcon: (tabInfo) => (
          <Ionicons
            name="md-settings-outline"
            size={tabInfo.focused ? 26 : 20}
            color={tabInfo.tintColor}
          />
        ),
      },
    },
  },
  {
    initialRouteName: "Home",
    barStyle: { backgroundColor: "#006600" },
  }
);
  
const Navigator = createAppContainer(TabNavigator);
  
export default function App() {
  return (
    <Navigator>
      <HomeScreen />
    </Navigator>
  );
}