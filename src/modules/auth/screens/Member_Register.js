import React, {Component} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Image,
} from 'react-native';

import TextField from '../../../components/TextField';
import Gradiant_Button from '../../../components/Gradiant_Button';
import Header from '../../../components/Header';
import calendar from '../components/calendar';
import {
  adduser,
  register,
  createupdateenroller,
} from '../../../services/api/api.function';
import {setUserType, setToken} from '../../../store/action/auth/action';
import {
  verifyEmail,
  verifyPassword,
} from '../../../services/miscellaneous/miscellaneous.configure';

import ImagePicker from 'react-native-image-crop-picker';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import ActionSheet from '@alessiocancian/react-native-actionsheet';
import qs from 'qs';
import {connect} from 'react-redux';
import moment from 'moment';
import {Toast} from 'native-base';
import Spinner from 'react-native-loading-spinner-overlay';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

class Member_Register extends Component {
  constructor() {
    super();
    this.state = {
      isShowPassword: true,
      isShowConfirmPassword: true,
      isDatePickerVisible: false,
      fullname: '',
      email: '',
      phone: null,
      address: '',
      password: '',
      confirmpassword: '',
      since: null,
      medicaldate: null,
      location: '',
      dob: null,
      base64: '',
      filename: 'image',
      imagepath: '',
      memberid: null,
      loading: false,
      dobboolean: false,
      sinceboolean: false,
    };
  }
  managePasswordVisibility = () => {
    this.setState({isShowPassword: !this.state.isShowPassword});
  };

  manageConfirmPasswordVisibility = () => {
    this.setState({isShowConfirmPassword: !this.state.isShowConfirmPassword});
  };

  showDatePicker = () => {
    this.setState({isDatePickerVisible: true});
  };

  hideDatePicker = () => {
    this.setState({isDatePickerVisible: false});
  };

  handleConfirm = date => {
    const {dobboolean, sinceboolean, since, dob} = this.state;
    if (dobboolean === true) {
      this.setState({
        dob: moment(date).format(''),
      });
    } else if (sinceboolean === true) {
      this.setState({
        since: moment(date).format(''),
      });
    }

    this.hideDatePicker();
  };

  showActionSheet = () => {
    this.ActionSheet.show();
  };

  ImageGallery = async () => {
    setTimeout(() => {
      ImagePicker.openPicker({
        width: 300,
        height: 400,
        cropping: true,
        includeBase64: true,
        multiple: false,
        compressImageQuality: 0.5,
      }).then(image => {
        console.log(image);
        if (image.data) {
          this.setState(
            {
              base64: image.data,
              filename:
                Platform.OS === 'ios' ? image.filename : 'image' + new Date(),
              imagepath: image.path,
            },
            () => {
              this.uploadImage();
            },
          );
        }
      });
    }, 700);
  };

  ImageCamera = async () => {
    setTimeout(() => {
      ImagePicker.openCamera({
        width: 300,
        height: 400,
        cropping: true,
        includeBase64: true,
        multiple: false,
        compressImageQuality: 0.5,
      }).then(image => {
        console.log(image);
        if (image.data) {
          this.setState(
            {
              base64: image.data,
              filename:
                Platform.OS === 'ios' ? image.filename : 'image' + new Date(),
              imagepath: image.path,
            },
            () => {
              this.uploadImage();
            },
          );
        }
      });
    }, 700);
  };

  uploadImage = async () => {
    this.setState({loading: true});
    const {base64} = this.state;
    let data = JSON.stringify({
      Type: 6,
      User_Image_Base: 'data:image/png;base64, ' + base64,
    });
    try {
      // const token = await AsyncStorage.getItem('token');
      const res = await adduser(data);
      console.log(res[1], 'resssss');
      this.setState({imagepath: res[1], loading: false});
    } catch (error) {
      if (error.request) {
        console.log(error.request);
      } else if (error.responce) {
        console.log(error.responce);
      } else {
        console.log(error);
      }
    }
  };

  AddMember = async () => {
    const {navigation} = this.props;
    const {
      isShowPassword,
      isShowConfirmPassword,
      isDatePickerVisible,
      fullname,
      email,
      phone,
      password,
      confirmpassword,
      since,
      location,
      medicaldate,
      address,
      dob,
      imagepath,
      memberid,
    } = this.state;
    if (
      this.validation() &&
      this.passwordCheck() &&
      this.checkPassEmail(email, confirmpassword)
    ) {
      this.setState({loading: true});
      let data = {
        User_FullName: fullname,
        User_Phone: phone,
        User_Email: email,
        User_Password: confirmpassword,
        User_Address: address,
        User_DOB: dob,
        User_Since: since,
        User_Image_Path: imagepath,
        User_MemberID: memberid,
        Type: 1,
        User_Type: 1,
        User_IsActive: 1,
        User_IsDelete: 0,
      };
      console.log(data);
      try {
        // const token = await AsyncStorage.getItem('token');
        const res = await adduser(data);
        console.log('ressssss:', res);
        console.log('Profile Updated');
        this.onMemberRegister();
        this.setState({loading: false});
      } catch (error) {
        console.log(error.response.data.error_description);
        this.setState({loading: false});
      }
    }
  };

  onMemberRegister = async () => {
    this.setState({loading: true});
    let data = qs.stringify({
      username: this.state.email,
      password: this.state.confirmpassword,
      clientid: 1,
      grant_type: 'password',
    });
    await register(data)
      .then(res => {
        this.showMessage('Account created successfully');
        console.log('res: ', res);
        this.setState({loading: false});
        this.props.setToken(res.access_token);
        // AsyncStorage.setItem('token', res.access_token);
        // navigation.navigate('DrawerNavigator', {screen: 'HomeScreen'});
      })
      .catch(error => {
        console.log(error.response.data.error_description);
        this.setState({loading: false});
      });
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

  validation = () => {
    const {fullname, email, password, confirmpassword} = this.state;
    let cancel = false;
    if (fullname.length === 0) {
      cancel = true;
    }
    if (email.length === 0) {
      cancel = true;
    }
    if (password.length === 0) {
      cancel = true;
    }
    if (confirmpassword.length === 0) {
      cancel = true;
    }
    if (cancel) {
      this.showMessage('Fields can not be empty');
      return false;
    } else {
      return true;
    }
  };

  passwordCheck = () => {
    const {password, confirmpassword} = this.state;
    if (password !== confirmpassword) {
      this.showMessage('Password does not match');
      return false;
    } else {
      return true;
    }
  };

  checkPassEmail = (email, password) => {
    let cancel = false;
    if (verifyEmail(email)) {
      cancel = true;
      this.showMessage('Please enter valid email');
    }
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

  render() {
    const {navigation} = this.props;
    const {
      isShowPassword,
      isShowConfirmPassword,
      isDatePickerVisible,
      fullname,
      email,
      phone,
      password,
      confirmpassword,
      since,
      dob,
      location,
      imagepath,
      memberid,
      address,
      loading,
    } = this.state;
    const user = this.props.userType;
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: '#E5E5E5'}}>
        <Header />
        <ScrollView keyboardShouldPersistTaps="handled">
          <Spinner visible={loading} color="#5B0BBC" />
          <View style={{marginTop: 10, marginLeft: 20}}>
            <Text style={styles.sign}>Sign Up</Text>
          </View>
          <View style={{marginTop: 10, marginLeft: 20}}>
            <Text style={styles.desc}>Please sign up to enter in a app</Text>
          </View>
          <View>
            <Image
              style={styles.imagecircle}
              source={{
                uri: imagepath
                  ? imagepath
                  : 'https://t4.ftcdn.net/jpg/03/32/59/65/360_F_332596535_lAdLhf6KzbW6PWXBWeIFTovTii1drkbT.jpg',
              }}
            />
            <TouchableOpacity
              onPress={this.showActionSheet}
              style={styles.innercircle}>
              <SimpleLineIcons name="pencil" color="#252B48" size={20} />
            </TouchableOpacity>
          </View>

          <ActionSheet
            ref={o => (this.ActionSheet = o)}
            title={'Which one do you like ?'}
            options={['Camera', 'Gallery', 'Cancel']}
            cancelButtonIndex={2}
            destructiveButtonIndex={1}
            onPress={index => {
              if (index === 0) {
                this.ImageCamera();
              } else if (index === 1) {
                this.ImageGallery();
              }
            }}
          />
          <View style={{marginTop: 20}}>
            <TextField
              label="Full Name"
              value={fullname}
              onChangeText={fullname => this.setState({fullname})}
            />
          </View>
          <View style={{marginTop: 20}}>
            <TextField label="Since" keyboardType="numeric" value={since} />
            <TouchableOpacity
              style={styles.calendar}
              onPress={() =>
                this.setState(
                  {
                    dobboolean: false,
                    sinceboolean: true,
                  },
                  this.showDatePicker(),
                )
              }>
              <AntDesign name="calendar" color="#36596A" size={26} />
            </TouchableOpacity>
          </View>
          <View style={{marginTop: 20}}>
            <TextField
              label="Address"
              value={address}
              onChangeText={address => this.setState({address})}
            />
          </View>
          <View style={{marginTop: 20}}>
            <TextField
              label="Email address"
              value={email}
              onChangeText={email => this.setState({email})}
            />
          </View>

          <View style={{marginTop: 20}}>
            <TextField
              label="Password"
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
              label="Confirm Password"
              value={confirmpassword}
              onChangeText={confirmpassword => this.setState({confirmpassword})}
              secureTextEntry={isShowConfirmPassword}
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
          <View style={{marginTop: 20}}>
            <TextField
              label="Member ID"
              value={memberid}
              onChangeText={memberid => this.setState({memberid})}
              keyboardType="numeric"
            />
          </View>
          <View style={{marginTop: 20}}>
            <TextField
              label="Phone Number"
              value={phone}
              onChangeText={phone => this.setState({phone})}
              keyboardType="numeric"
            />
          </View>
          <View style={{marginTop: 20}}>
            <TextField
              label="Date of Birth"
              keyboardType="numeric"
              value={dob}
            />
            <TouchableOpacity
              style={styles.calendar}
              onPress={() =>
                this.setState(
                  {
                    dobboolean: true,
                    sinceboolean: false,
                  },
                  this.showDatePicker(),
                )
              }>
              <AntDesign name="calendar" color="#36596A" size={26} />
            </TouchableOpacity>
          </View>

          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={date => this.handleConfirm(date)}
            onCancel={() => this.hideDatePicker()}
          />

          <View style={{marginTop: 20}}>
            <TextField
              label="Location"
              value={location}
              onChangeText={location => this.setState({location})}
            />
          </View>
          <View style={{marginTop: 20, marginBottom: 20}}>
            <Gradiant_Button
              text="Register"
              onPress={
                this.props.userType === true
                  ? () => this.AddMember()
                  : () => this.AddEnroller()
              }
            />
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: 20,
            }}>
            <Text style={styles.account}>Already have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
              <Text style={styles.signin}>Sign In</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  imagecircle: {
    height: 175,
    width: 175,
    borderRadius: 100,
    borderWidth: 1,
    alignSelf: 'center',
    marginTop: 20,
    borderColor: '#2b0237',
  },
  innercircle: {
    position: 'absolute',
    height: 50,
    width: 50,
    borderRadius: 25,
    bottom: 0,
    right: 120,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sign: {
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
  document: {
    marginTop: 10,
    height: windowHeight / 4,
    width: windowWidth / 1.1,
    borderWidth: 1,
    backgroundColor: '#F9F9F9',
    borderColor: '#F0F0F0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  docs: {
    height: windowHeight / 4.75,
    width: windowWidth / 1.2,
    backgroundColor: '#EFE6FA',
    alignItems: 'center',
    justifyContent: 'center',
  },
  calendar: {position: 'absolute', right: 30, bottom: 15},
  account: {
    fontSize: 16,
    lineHeight: 24,
    color: '#98A6AE',
    textAlign: 'left',
    fontWeight: '400',
    // fontFamily: 'Poppins',
  },
  signin: {
    fontSize: 16,
    lineHeight: 24,
    color: '#7200FD',
    textAlign: 'left',
    fontWeight: '700',
    // fontFamily: 'Poppins',
  },
});

const mapStateToProps = (state, ownProps) => ({
  // access or fetch

  userType: state.authReducer.usertype,
});

const mapDispatchToProps = {
  // to stored
  setToken,
};

export default connect(mapStateToProps, mapDispatchToProps)(Member_Register);
