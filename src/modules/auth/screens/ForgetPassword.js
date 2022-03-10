import React, {Component} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Platform,
  ScrollView,
} from 'react-native';

import Icon from 'react-native-vector-icons/AntDesign';
import dynamicLinks from '@react-native-firebase/dynamic-links';
import Spinner from 'react-native-loading-spinner-overlay';
import {Toast} from 'native-base';
import {connect} from 'react-redux';

import TextField from '../../../components/TextField';
import Gradiant_Button from '../../../components/Gradiant_Button';
import Header from '../../../components/Header';
import {forgotpassword} from '../../../services/api/api.function';
import {setUserType} from '../../../store/action/auth/action';

class ForgetPassword extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      device: 1,
      isLoading: false,
    };
  }

  componentDidMount() {
    if (Platform.OS === 'android') {
      this.setState({
        device: 1,
      });
    } else {
      this.setState({
        device: 2,
      });
    }
  }

  generateLink = async () => {
    const link = await dynamicLinks().buildShortLink({
      link: `https://meborn.page.link/forgetpassword/${this.state.email}`,
      domainUriPrefix: 'https://meborn.page.link',
      // ios: {
      //   bundleId: "com.avigma.communv",
      //   appStoreId: "1579823021",
      //   fallbackUrl: "https://apps.apple.com/us/app/com.houseplant/id1535962213",
      // },
      android: {
        packageName: 'com.meborn',
        fallbackUrl: 'https://play.google.com/store/apps/details?id=com.meborn',
      },
      navigation: {
        forcedRedirectEnabled: true,
      },
    });
    console.log(link);
    this.setState({link});
  };

  onHandleForgotPassword = async () => {
    await this.generateLink();
    const error = this.Validation();
    if (error) {
      const {email, link, device} = this.state;
      this.setState({isLoading: true});
      console.log(email, 'email');
      console.log(link, 'link');
      if (email && link) {
        let data = {
          EmailID: email,
          Type: this.props.userType === 'true' ? 1 : 2,
          Email_Url: link,
          Device: device,
        };
        console.log(data);
        await forgotpassword(data)
          .then(res => {
            this.setState({isLoading: false});
            if (res[0].UserCode === 'Sucesss') {
              console.log('successs');
              this.showMessage(
                'Link sent successfully. Please check your registered email.',
              );
            }
            if (res[0].UserCode === 'Error') {
              this.showMessage('Please check your email.');
            }
          })
          .catch(error => {
            if (error.response) {
              console.log('responce_error', error.response);
              this.setState({isLoading: false});
            } else if (error.request) {
              this.setState({isLoading: false});
              console.log('request error', error.request);
            }
          });
      } else {
        this.showMessage('Something went wrong!!!');
      }
    }
  };

  Validation = () => {
    let cancel = false;
    if (this.state.email.length === 0) {
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

  render() {
    const {navigation} = this.props;
    const {email, isLoading} = this.state;
    const member = this.props.userType;

    return (
      <SafeAreaView style={{flex: 1, backgroundColor: '#FFFFFF'}}>
        <Spinner visible={isLoading} />
        <Header />
        <ScrollView keyboardShouldPersistTaps="handled">
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
              Enter your email address and we'll send you a link to reset your
              password.
            </Text>
          </View>
          <View style={{marginTop: 20}}>
            <TextField
              label="Email address*"
              value={email}
              onChangeText={email => this.setState({email})}
            />
          </View>
          <View style={{marginTop: 100}}>
            <Gradiant_Button
              text="Send"
              onPress={() => this.onHandleForgotPassword()}
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
});

const mapStateToProps = (state, ownProps) => ({
  // access or fetch
  userType: state.authReducer.usertype,
});

export default connect(mapStateToProps)(ForgetPassword);
