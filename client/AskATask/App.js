import React from "react";
import { NavigationContainer } from "@react-navigation/native";

import AuthTokenProvider from "./Context/AuthTokenProvider";
import LoginProvider from "./Context/LoginProvider";
import MainNavigation from "./Navigator/MainNavigation";

export default function App() {
  return (
    <LoginProvider>
      <AuthTokenProvider>
        <NavigationContainer>
          <MainNavigation />
        </NavigationContainer>
      </AuthTokenProvider>
    </LoginProvider>
  );
}
