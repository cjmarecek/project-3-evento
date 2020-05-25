import React from 'react';
import { Image, View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { BACKGROUD_COLOR } from '../../../styles/sharedStyles';

import { connect } from 'react-redux';
import { logOutUser } from '../../../redux/actions/userActions';

class SignOutScreen extends React.Component {

  logOut = () => {
    this.props.logOutUser();
    this.props.navigation.navigate('Events');
  }

  render() {
    return (
      <View style={styles.container}>
        <Image
          style={{ height: 111, resizeMode: 'contain' }}
          source={require('../../../assets/onlinelogomaker-042120-1840-9789.png')}
        />
        <TouchableOpacity style={styles.button} onPress={this.logOut}>
          <Text style={styles.buttonText}>SIGN OUT</Text>
        </TouchableOpacity>
      </View>
    );
  }
}


export default connect(null, {logOutUser})(SignOutScreen);

const styles = StyleSheet.create({
  container: {
    backgroundColor: BACKGROUD_COLOR,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    width: '70%',
    backgroundColor: 'white',
    borderRadius: 5,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
  },
  buttonText: {
    fontWeight: '500',
  },
});
