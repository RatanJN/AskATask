import React from "react";
import { NavigationContainer } from "@react-navigation/native";

import AuthTokenProvider from "./Context/AuthTokenProvider";
import LoginProvider from "./Context/LoginProvider";
import MainNavigation from "./Navigator/MainNavigation";
import RefreshProvider from "./Context/RefreshProvider";

export default function App() {
  return (
    <LoginProvider>
      <RefreshProvider>
        <AuthTokenProvider>
          <NavigationContainer>
            <MainNavigation />
          </NavigationContainer>
        </AuthTokenProvider>
      </RefreshProvider>
    </LoginProvider>
  );
}
