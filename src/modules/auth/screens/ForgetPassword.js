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

export default class ForgetPassword extends Component {
  render() {
    const {navigation} = this.props;
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: '#E5E5E5'}}>
        <Header />
        <TouchableOpacity
          style={{marginTop: 15, marginLeft: 15}}
          onPress={() => navigation.goBack()}>
          <Icon name="arrowleft" color="#34353E" size={30} />
        </TouchableOpacity>
        <View style={{marginTop: 20, marginLeft: 20}}>
          <Text style={styles.forgetpass}>Forgot Password</Text>
        </View>
        <View style={{marginTop: 10, marginLeft: 20}}>
          <Text style={styles.desc}>
            Enter your email for the verification proccess. We will send forgot
            password link.
          </Text>
        </View>
        <View style={{marginTop: 20}}>
          <TextField label="Email address*" />
        </View>
        <View style={{marginTop: 100}}>
          <Gradiant_Button
            text="Send"
            onPress={() => navigation.navigate('ResetPassword')}
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
});
