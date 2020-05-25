import React from 'react';
import {
  TouchableOpacity,
  Image,
  View,
  StyleSheet,
  Text,
  TextInput,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import PropTypes from 'prop-types';
import { BACKGROUD_COLOR } from '../../../styles/sharedStyles';
import { connect } from 'react-redux';
import { logInUser } from '../../../redux/actions/userActions';

class SignInScreen extends React.Component {
  static propTypes = {
    error: PropTypes.string,
    token: PropTypes.string,
    logInUser: PropTypes.func,
  };

  state = {
    username: '',
    password: '',
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.token) {
      this.props.navigation.navigate('Events');
      return null
    }
    return null
  }

  _login = async () => {
    this.props.logInUser(this.state.username, this.state.password);
    this.props.navigation.navigate('Events');
  };

  handleUsernameUpdate = username => {
    this.setState({ username });
  };

  handlePasswordUpdate = password => {
    this.setState({ password });
  };

  render() {
    return (
      <KeyboardAvoidingView behavior="padding" enabled style={styles.container}>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.contentContainer}
        >
          <Image
            style={{ height: 111, resizeMode: 'contain' }}
            source={require('../../../assets/onlinelogomaker-042120-1840-9789.png')}
          />
          <View style={styles.errorContainer}>
            {this.props.error ? (
              <Text style={styles.errorText}>{this.props.error}</Text>
            ) : null}
          </View>
          <View style={styles.inputView}>
            <TextInput
              placeholder="username"
              style={styles.inputText}
              value={this.state.username}
              onChangeText={this.handleUsernameUpdate}
              autoCapitalize="none"
            />
          </View>
          <View style={styles.inputView}>
            <TextInput
              placeholder="password"
              style={styles.inputText}
              value={this.state.password}
              onChangeText={this.handlePasswordUpdate}
              secureTextEntry
            />
          </View>
          <TouchableOpacity
            style={styles.forgotButton}
            onPress={() => {
              alert('Thats a pity!');
            }}
          >
            <Text style={styles.forgotText}>Forgot Password?</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.loginBtn} onPress={this._login}>
            <Text style={styles.loginText}>LOGIN</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}

const mapStateToProps = state => ({
  error: state.user.error,
  token: state.user.token,
});

export default connect(mapStateToProps, { logInUser })(SignInScreen);

const styles = StyleSheet.create({
  container: {
    backgroundColor: BACKGROUD_COLOR,
  },
  scrollView: {
    width: '100%',
    height: '100%',
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputView: {
    width: '70%',
    backgroundColor: 'white',
    borderRadius: 5,
    height: 50,
    marginBottom: 20,
    justifyContent: 'center',
    padding: 20,
  },
  inputText: {
    height: 40,
    color: 'black',
  },
  forgotButton: {},
  forgotText: {
    color: 'black',
    fontSize: 11,
  },
  loginBtn: {
    width: '70%',
    backgroundColor: 'white',
    borderRadius: 5,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
  },
  loginText: {
    fontWeight: '500',
  },
  errorContainer: {
    height: 40,
    width: '70%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorText: {
    textAlign: 'center',
    color: 'red',
  },
});
