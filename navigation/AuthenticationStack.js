import React from 'react';
import { connect } from 'react-redux';

import { createStackNavigator } from '@react-navigation/stack';
import { screenOptionsConfig, signInOptions } from './screenOptionsConfigs';

import SignInScreen from '../components/screens/authenticationStack/SignInScreen';

const AuthenticationStack = createStackNavigator();

function Authentication(props) {
  return (
    <AuthenticationStack.Navigator screenOptions={screenOptionsConfig}>
      <AuthenticationStack.Screen
        name="SignIn"
        component={SignInScreen}
        options={signInOptions(props.isSignout)}
      />
    </AuthenticationStack.Navigator>
  );
}

const mapStateToProps = state => ({
  token: state.user.token,
  isSignout: state.user.isSignout,
});

export default connect(mapStateToProps)(Authentication);
