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
import { Stitch, AnonymousCredential } from "mongodb-stitch-react-native-sdk";

export default function App() {

  const [currentUserId, setCurrentUserId] = useState({});
  const [client, setClient]  = useState({});

  useEffect(() => {
    _loadClient();
  },[]);

  const _loadClient = () => {
    Stitch.initializeDefaultAppClient("keric-app-fouoc").then((clientParam) => {
      setClient({ client: clientParam });

      if (clientParam.auth.isLoggedIn) {
        setCurrentUserId({ setCurrentUserId: clientParam.auth.user.id });
      } else {
        client.auth.loginWithCredential(new AnonymousCredential()).then(user => {
          console.log(`Successfully logged in as user ${user.id}`);
          setCurrentUserId({  currentUserId: user.id })
      }).catch(err => {
          console.log(`Failed to log in anonymously: ${err}`);
          setCurrentUserId({  currentUserId: null })
      });
      }
    });
  }
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
