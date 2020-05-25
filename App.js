import React from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
// import { MenuProvider } from 'react-native-popup-menu';
// import HeaderDropdown from './components/HeaderDropdown';

import { store, persistor } from './redux/store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import MainDrawer from './navigation/MainDrawer';

export default function App() {
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
