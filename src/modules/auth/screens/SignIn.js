import React, {Component} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {connect} from 'react-redux';
import qs from 'qs';
import {Toast} from 'native-base';
import Spinner from 'react-native-loading-spinner-overlay';

import TextField from '../../../components/TextField';
import Gradiant_Button from '../../../components/Gradiant_Button';
import Header from '../../../components/Header';
import Icon_Button from '../components/Icon_Button';
import {setUserType, setToken} from '../../../store/action/auth/action';
import {login} from '../../../services/api/api.function';

class SignIn extends Component {
  constructor() {
    super();
    this.state = {
      isShowPassword: true,
      email: '',
      password: '',
      loading: false,
    };
  }

  // componentDidMount() {
  //   const {navigation} = this.props;
  //   this._unsubscribe = navigation.addListener('focus', async () => {
  //
  //   });
  // }

  // componentWillUnmount() {
  //   this._unsubscribe;
  // }

  managePasswordVisibility = () => {
    this.setState({isShowPassword: !this.state.isShowPassword});
  };

  Validation = () => {
    const {email, password} = this.state;
    let cancel = false;
    if (email.length === 0) {
      cancel = true;
    }
    if (password.length === 0) {
      cancel = true;
    }
    if (cancel) {
      this.showMessage('Fields can not be empty');
      return false;
    } else {
      return true;
    }
  };

  showMessage = message => {
    if (message !== '' && message !== null && message !== undefined) {
      Toast.show({
        title: message,
        placement: 'bottom',
        duration: 5000,
      });
    }
  };

  onMemberLogin = async () => {
    if (this.Validation()) {
      this.setState({loading: true});
      let data = qs.stringify({
        username: this.state.email,
        password: this.state.password,
        clientid: 1,
        grant_type: 'password',
      });
      await login(data)
        .then(res => {
          console.log('res: ', res);
          this.setState({loading: false});
          this.props.setToken(res.access_token);
          this.showMessage('Login successfully');
          this.props.navigation.navigate('Homepage');
        })
        .catch(error => {
          this.setState({loading: false});
          console.log(error.response.data.error_description);
          if (error.response.data.error_description) {
            this.showMessage('The username or password is incorrect');
          }
        });
    }
  };

  onEnrollerLogin = async () => {
    if (this.Validation()) {
      this.setState({loading: true});
      let data = qs.stringify({
        username: this.state.email,
        password: this.state.password,
        clientid: 2,
        grant_type: 'password',
      });
      await login(data)
        .then(res => {
          this.setState({loading: false});
          console.log('res: ', res);
          this.props.setToken(res.access_token);
          this.showMessage('Login successfully');
          this.props.navigation.navigate('EnrollerProfile');
        })
        .catch(error => {
          console.log(error.response.data.error_description);
          this.setState({loading: false});
          if (error.response.data.error_description) {
            this.showMessage('The username or password is incorrect');
          }
        });
    }
  };

  render() {
    const {navigation} = this.props;
    const {isShowPassword, email, password, loading} = this.state;
    const member = this.props.userType;
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: '#FFFFFF'}}>
        <Header />
        <ScrollView keyboardShouldPersistTaps="handled">
          <Spinner visible={loading} color="#5B0BBC" />
          <View style={{marginTop: 10, marginLeft: 20}}>
            <Text style={styles.sign}>Sign In</Text>
          </View>
          <View style={{marginTop: 10, marginLeft: 20}}>
            <Text style={styles.desc}>Please sign in to enter in a app</Text>
          </View>
          <View style={{marginTop: 20}}>
            <TextField
              label="Email address*"
              value={email}
              onChangeText={email => this.setState({email})}
            />
          </View>
          <View style={{marginTop: 20}}>
            <TextField
              label="Password*"
              value={password}
              onChangeText={password => this.setState({password})}
              secureTextEntry={isShowPassword}
            />
            <TouchableOpacity
              style={styles.calendar}
              onPress={() => this.managePasswordVisibility()}>
              <Ionicons
                name={isShowPassword ? 'md-eye-off-outline' : 'md-eye-outline'}
                color="#36596A"
                size={26}
              />
            </TouchableOpacity>
          </View>
          <View
            style={{
              marginTop: 10,
              alignItems: 'flex-end',
              marginRight: 20,
              // marginBottom: 50,
            }}>
            <TouchableOpacity
              onPress={() => navigation.navigate('ForgetPassword')}>
              <Text style={styles.forgetpass}>Forgot password?</Text>
            </TouchableOpacity>
          </View>
          <View style={{marginTop: 20}}>
            <Gradiant_Button
              text="Login"
              onPress={
                member === true
                  ? () => this.onMemberLogin()
                  : () => this.onEnrollerLogin()
              }
            />
          </View>
          {/* {member === true ? (
            <View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginTop: -20,
                }}>
                <View style={styles.orline1} />
                <View style={{marginTop: 45}}>
                  <Text style={styles.desc}>OR</Text>
                </View>

                <View style={styles.orline2} />
              </View>
              <View style={{marginTop: 20}}>
                <Icon_Button
                  text="Sign in with Google"
                  image={require('../assets/gmail-logo.png')}
                />
              </View>
              <View style={{marginTop: 10}}>
                <Icon_Button
                  text="Sign in with Facebook"
                  image={require('../assets/facebook-logo.png')}
                />
              </View>
            </View>
          ) : null} */}

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: 20,
            }}>
            <Text style={styles.account}>Don't have an account? </Text>
            <TouchableOpacity
              onPress={
                member === true
                  ? () => navigation.navigate('Member_Register')
                  : () => navigation.navigate('Enroller_Register')
              }>
              <Text style={styles.signup}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  sign: {
    fontSize: 30,
    lineHeight: 44,
    color: '#264653',
    textAlign: 'left',
    fontWeight: '700',
    fontFamily: 'Poppins-Regular',
  },
  desc: {
    fontSize: 16,
    lineHeight: 24,
    color: '#98A6AE',
    textAlign: 'left',
    fontWeight: '400',
    fontFamily: 'Poppins-Regular',
  },
  forgetpass: {
    fontSize: 14,
    lineHeight: 21,
    color: '#BDBDBD',
    textAlign: 'left',
    fontWeight: '500',
    fontFamily: 'Poppins-Regular',
  },
  orline1: {
    borderBottomWidth: 1,
    marginTop: 45,
    width: '40%',
    marginRight: 5,
    borderColor: '#98A6AE',
  },
  orline2: {
    borderBottomWidth: 1,
    marginTop: 45,
    width: '40%',
    marginLeft: 5,
    borderColor: '#98A6AE',
  },
  account: {
    fontSize: 16,
    lineHeight: 24,
    color: '#98A6AE',
    textAlign: 'left',
    fontWeight: '400',
    fontFamily: 'Poppins-Regular',
  },
  signup: {
    fontSize: 16,
    lineHeight: 24,
    color: '#7200FD',
    textAlign: 'left',
    fontWeight: '700',
    fontFamily: 'Poppins-Regular',
  },
  calendar: {position: 'absolute', right: 30, bottom: 15, zIndex: 1},
});

const mapStateToProps = (state, ownProps) => ({
  // access or fetch
  userType: state.authReducer.usertype,
});
const mapDispatchToProps = {
  // to stored
  setToken,
};
export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
