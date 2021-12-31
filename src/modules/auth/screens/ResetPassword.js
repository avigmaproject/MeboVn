import React, {Component} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import TextField from '../../../components/TextField';
import Gradiant_Button from '../../../components/Gradiant_Button';
import Header from '../../../components/Header';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default class ResetPassword extends Component {
  constructor() {
    super();
    this.state = {
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

  render() {
    const {navigation} = this.props;
    const {isShowPassword, isShowConfirmPassword} = this.state;
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: '#E5E5E5'}}>
        <Header />
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
          <TextField label="New Password*" secureTextEntry={isShowPassword} />
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
          />
          <TouchableOpacity
            style={styles.calendar}
            onPress={() => this.manageConfirmPasswordVisibility()}>
            <Ionicons
              name={
                isShowConfirmPassword ? 'md-eye-off-outline' : 'md-eye-outline'
              }
              color="#36596A"
              size={26}
            />
          </TouchableOpacity>
        </View>
        <View style={{marginTop: 100}}>
          <Gradiant_Button
            text="Update Password"
            // onPress={() => navigation.navigate('ResetPassword')}
          />
        </View>
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
    // fontFamily: 'Poppins',
  },
  desc: {
    fontSize: 16,
    lineHeight: 24,
    color: '#98A6AE',
    textAlign: 'left',
    fontWeight: '400',
    // fontFamily: 'Poppins',
  },
  calendar: {position: 'absolute', right: 30, bottom: 15},
});
