import React from 'react';
import { Image, View } from 'react-native';
import { connect } from 'react-redux';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import 'react-native-gesture-handler';

import Events from './EventsStack';
import Authentication from './AuthenticationStack';
import SignOutScreen from '../components/screens/authenticationStack/SignOutScreen'
import signOutOptions from './screenOptionsConfigs'

import {
  BACKGROUD_COLOR,
  ACTIVE_COLOR,
  INACTIVE_COLOR,
  WINDOW_WIDTH,
} from '../styles/sharedStyles';

function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      <View style={{marginVertical: 20, mjustifyContent: 'center', alignItems: 'center'}}>
        <Image
          style={{ height: 111, resizeMode: 'contain' }}
          source={require('../assets/onlinelogomaker-042120-1840-9789.png')}
        />
      </View>
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
}

const Drawer = createDrawerNavigator();
const MainDrawer = props => {
  return (
    <Drawer.Navigator
      drawerContent={() => <DrawerContent />}
      initialRouteName="Events"
      drawerStyle={{
        backgroundColor: BACKGROUD_COLOR,
        width: WINDOW_WIDTH - 150,
      }}
      drawerContentOptions={{
        activeTintColor: ACTIVE_COLOR,
        inactiveTintColor: INACTIVE_COLOR,
        itemStyle: { flex: 1, paddingLeft: 20, alignItems: 'center', justifyContent: 'space-between' },
      }}
      drawerContent={props => CustomDrawerContent(props)}
    >
      <Drawer.Screen name="Events" component={Events} />
      {props.token ? (<Drawer.Screen name="Sign Out" component={SignOutScreen} options={signOutOptions} />) : (
      <Drawer.Screen name="Sign In" component={Authentication} />)}

    </Drawer.Navigator>
  );
};

const mapStateToProps = state => ({
  token: state.user.token,
});

export default connect(mapStateToProps)(MainDrawer);
