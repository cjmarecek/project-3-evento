import React, { useState, useEffect } from "react";
import { Button, StyleSheet, Text, View } from "react-native";

// navigation
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import MainDrawer from "./navigation/MainDrawer";
// import { MenuProvider } from 'react-native-popup-menu';
// import HeaderDropdown from './components/HeaderDropdown';

// redux
import { store, persistor } from "./redux/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

// stitch
import {login } from './api'
export default function App() {

  // const [currentUserId, setCurrentUserId] = useState({});
  // const [client, setClient]  = useState({});

  // useEffect(() => {
  //   () => login();
  // },[]);

  
    return (
        <Provider store={store}>
          {/* <MenuProvider customStyles={menuProviderStyles}> */}
          <PersistGate loading={null} persistor={persistor}>
            <NavigationContainer>
              <MainDrawer />
            </NavigationContainer>
          </PersistGate>
          {/* </MenuProvider> */}
        </Provider>
    );
  }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

// const styles = StyleSheet.create({
//   container: {
//     flexDirection: 'column',
//   },
//   backdrop: {
//     backgroundColor: 'white',
//     opacity: 0.5,
//   },
//   anchorStyle: {
//     backgroundColor: 'blue',
//   },
// });

// const menuProviderStyles = {
//   menuProviderWrapper: styles.container,
//   backdrop: styles.backdrop,
// };
