import React, { useState, useEffect } from "react";

// navigation
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import MainDrawer from "./navigation/MainDrawer";

// redux
import { store, persistor } from "./redux/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          <MainDrawer />
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}
