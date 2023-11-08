import React from "react";
import { NavigationContainer } from "@react-navigation/native";

import LoginProvider from "./Context/LoginProvider"
import MainNavigation from "./Navigator/MainNavigation"


export default function App() {
  return (
    <LoginProvider>
      <NavigationContainer>
        <MainNavigation/>
      </NavigationContainer>
    </LoginProvider>
  );
}
