import React, {Component} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

import Icon from 'react-native-vector-icons/AntDesign';
import {Toast} from 'native-base';
import {connect} from 'react-redux';

import TextField from '../../../components/TextField';
import Gradiant_Button from '../../../components/Gradiant_Button';
import Header from '../../../components/Header';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {resetpassword} from '../../../services/api/api.function';
import {verifyPassword} from '../../../services/miscellaneous/miscellaneous.configure';

class ResetPassword extends Component {
  constructor() {
    super();
    this.state = {
      cpassword: '',
      password: '',
      email: null,
      isLoading: false,
      isShowPassword: true,
      isShowConfirmPassword: true,
    };
  }

  managePasswordVisibility = () => {
    this.setState({isShowPassword: !this.state.isShowPassword});
  };

  manageConfirmPasswordVisibility = () => {
    this.setState({isShowConfirmPassword: !this.state.isShowConfirmPassword});
  };

  componentDidMount() {
    console.log('restpassword', this.props.route.params.link);
    const {link} = this.props.route.params;
    const spliturl = link.split('/');
    console.log('spliturl', spliturl[4]);
    this.setState({email: spliturl[4]});
  }

  onHandleResetPassword = async () => {
    if (
      this.Validation() &&
      this.passwordCheck() &&
      this.checkPass(this.state.cpassword)
    ) {
      const {password, email} = this.state;
      this.setState({isLoading: true});
      if (email && password) {
        let data = {
          User_Email: email,
          Type: this.props.userType === 'true' ? 1 : 2,
          User_Password: password,
          User_Type: 1,
        };
        console.log(data);
        await resetpassword(data)
          .then(res => {
            console.log('res: ', JSON.stringify(res));
            this.setState({isLoading: false});
            this.showMessage('Password Changed Successfully');
            setTimeout(() => {
              this.props.navigation.navigate('SuccessPage');
            }, 2000);
          })
          .catch(error => {
            if (error.response) {
              this.showMessage('Something went wrong!!!');
              console.log('responce_error', error.response);
              this.setState({isLoading: false});
            } else if (error.request) {
              this.showMessage('Something went wrong!!!');
              this.setState({isLoading: false});
              console.log('request error', error.request);
            }
          });
      } else {
        this.showMessage('Something went wrong!!!');
      }
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

  passwordCheck = () => {
    const {cpassword, password} = this.state;
    if (password !== cpassword) {
      this.showMessage('Password does not match');
      return false;
    } else {
      return true;
    }
  };

  checkPass = password => {
    let cancel = false;
    if (verifyPassword(password)) {
      cancel = true;
      this.showMessage(
        `Your password must be minimum 8 characters to 16 characters and must contain one uppercase, one digit and special character '?!@#$%^&*'`,
      );
    }
    if (cancel) {
      return false;
    } else {
      return true;
    }
  };

  Validation = () => {
    let cancel = false;
    if (this.state.password.length === 0) {
      cancel = true;
    }
    if (this.state.cpassword.length === 0) {
      cancel = true;
    }
    if (cancel) {
      this.showMessage('Fields can not be empty');
      return false;
    } else {
      return true;
    }
  };

  render() {
    const {navigation} = this.props;
    const {isShowPassword, isShowConfirmPassword, password, cpassword} =
      this.state;
    const member = this.props.userType;
    console.log(member, 'member');
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: '#FFFFFF'}}>
        <Header />
        <ScrollView keyboardShouldPersistTaps="handled">
          <TouchableOpacity
            style={{marginTop: 15, marginLeft: 15}}
            onPress={() => navigation.goBack()}>
            <Icon name="arrowleft" color="#34353E" size={30} />
          </TouchableOpacity>
          <View style={{marginTop: 20, marginLeft: 20}}>
            <Text style={styles.forgetpass}>Reset password</Text>
          </View>
          <View style={{marginTop: 10, marginLeft: 20}}>
            <Text style={styles.desc}>Enter your password</Text>
          </View>
          <View style={{marginTop: 20}}>
            <TextField
              label="New Password*"
              secureTextEntry={isShowPassword}
              value={password}
              onChangeText={password => this.setState({password})}
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
          <View style={{marginTop: 20}}>
            <TextField
              label="Confirm Password*"
              secureTextEntry={isShowConfirmPassword}
              value={cpassword}
              onChangeText={cpassword => this.setState({cpassword})}
            />
            <TouchableOpacity
              style={styles.calendar}
              onPress={() => this.manageConfirmPasswordVisibility()}>
              <Ionicons
                name={
                  isShowConfirmPassword
                    ? 'md-eye-off-outline'
                    : 'md-eye-outline'
                }
                color="#36596A"
                size={26}
              />
            </TouchableOpacity>
          </View>
          <View style={{marginTop: 100}}>
            <Gradiant_Button
              text="Update Password"
              onPress={() => this.onHandleResetPassword()}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  forgetpass: {
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
  calendar: {position: 'absolute', right: 30, bottom: 15, zIndex: 1},
});

const mapStateToProps = (state, ownProps) => ({
  // access or fetch
  userType: state.authReducer.usertype,
});

export default connect(mapStateToProps)(ResetPassword);
