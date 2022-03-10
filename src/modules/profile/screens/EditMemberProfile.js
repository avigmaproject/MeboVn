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
import Header from '../components/Header';
import calendar from '../../auth/components/calendar';
import {getusermaster} from '../../../services/api/api.function';

import {adduser} from '../../../services/api/api.function';
// import {setUserType, setToken} from '../../../store/action/auth/action';
// import {
//   verifyEmail,
//   verifyPassword,
// } from '../../../services/miscellaneous/miscellaneous.configure';

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
import AsyncStorage from '@react-native-async-storage/async-storage';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

class EditMemberProfile extends Component {
  constructor() {
    super();
    this.state = {
      userid: '',
      fullname: '',
      email: '',
      phone: null,
      address: '',
      since: '',
      memberid: null,
      npn: null,
      location: '',
      dob: '',
      imagepath: '',
      memberid: null,
      loading: false,
      stateList: [],
      open: false,
      value: null,
      dobboolean: false,
      sinceboolean: false,
      isShowPassword: false,
    };
  }
  showDatePicker = () => {
    this.setState({isDatePickerVisible: true});
  };

  hideDatePicker = () => {
    this.setState({isDatePickerVisible: false});
  };

  managePasswordVisibility = () => {
    this.setState({isShowPassword: !this.state.isShowPassword});
  };

  componentDidMount() {
    const {navigation} = this.props;
    this._unsubscribe = navigation.addListener('focus', () => {
      this.getMemberData();
    });
  }

  componentWillUnmount() {
    this._unsubscribe;
  }

  showActionSheet = () => {
    this.ActionSheet.show();
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

  getMemberData = async () => {
    console.log(this.props.userToken, 'this.props.userToken;');

    var data = JSON.stringify({
      Type: 2,
    });
    try {
      const res = await getusermaster(data, this.props.userToken);
      console.log(res[0][0], 'ressssssss');
      this.setState({
        email: res[0][0].User_Email,
        fullname: res[0][0].User_FullName,
        phone: res[0][0].User_Phone,
        address: res[0][0].User_Address,
        since: res[0][0].User_Since,
        memberid: res[0][0].User_MemberID,
        npn: res[0][0].EN_NPN,
        location: res[0][0].User_Location,
        dob: res[0][0].User_DOB,
        imagepath: res[0][0].User_Image_Path,
        userid: res[0][0].User_PkeyID,
        password: res[0][0].User_Password,
      });
      console.log(this.state.arrayofstates, 'arrayofstates');
    } catch (error) {
      console.log('hihihihihihih', {e: error.response.data.error});
    }
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
    const {base64, imagepath} = this.state;
    let data = JSON.stringify({
      Type: 6,
      User_Image_Base: 'data:image/png;base64, ' + base64,
    });
    try {
      // const token = await AsyncStorage.getItem('token');
      const res = await adduser(data);
      console.log(res[1], 'resssss');
      this.setState({imagepath: res[1], loading: false});
      AsyncStorage.setItem('image', res[1]);
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

  phoneValidation = () => {
    const {phone} = this.state;
    if (phone.length != 10) {
      this.showMessage('Please enter valid phone number');
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

  validation = () => {
    const {fullname, email, phone, password, confirmpassword} = this.state;
    let cancel = false;
    if (fullname.length === 0) {
      cancel = true;
    }

    if (phone === null) {
      cancel = true;
    }

    if (cancel) {
      this.showMessage('Fields can not be empty');
      return false;
    } else {
      return true;
    }
  };

  EditUser = async () => {
    const {navigation} = this.props;
    const {
      fullname,
      email,
      phone,
      password,
      address,
      since,
      npn,
      location,
      memberid,
      imagepath,
      dob,
      userid,
    } = this.state;
    if (this.validation() && this.phoneValidation()) {
      this.setState({loading: true});
      let data = {
        User_FullName: fullname,
        User_Phone: phone,
        User_Email: email,
        User_Password: password,
        User_Address: address,
        User_DOB: dob,
        User_Since: since,
        User_Image_Path: imagepath,
        User_MemberID: memberid,
        User_Location: location,
        Type: 2,
        User_PkeyID: userid,
        User_Type: 1,
        User_IsActive: 1,
        User_IsDelete: 0,
      };
      console.log(data, 'enrollerdata');
      try {
        // const token = await AsyncStorage.getItem('token');
        const res = await adduser(data, this.props.userToken);
        console.log('ressssss:', res);
        this.showMessage('Profile Updated');
        this.setState({loading: false});
        navigation.navigate('MemberProfile');
      } catch (error) {
        console.log(error.response.data.error_description);
        this.setState({loading: false});
      }
    }
  };

  render() {
    const {
      fullname,
      email,
      phone,
      password,
      since,
      npn,
      location,
      member,
      imagepath,
      dob,
      address,
      memberid,
      isDatePickerVisible,
      isShowPassword,
    } = this.state;
    const {navigation} = this.props;
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: '#FAFAFA'}}>
        <KeyboardAwareScrollView keyboardShouldPersistTaps="handled">
          {/* <Spinner visible={loading} color="#5B0BBC" /> */}
          <Header text="Edit Profile" onPress={() => navigation.goBack()} />
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
            title={'Profile Photo'}
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
            <TextField
              label="Since"
              keyboardType="numeric"
              editable={false}
              value={since}
            />
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
              // onChangeText={email => this.setState({email})}
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
              editable={false}
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
            maximumDate={new Date(Date.now() - 86400000)}
          />

          <View style={{marginTop: 20}}>
            <TextField
              label="Location"
              value={location}
              onChangeText={location => this.setState({location})}
            />
          </View>
          <View style={{marginTop: 20, marginBottom: 20}}>
            <Gradiant_Button text="Update" onPress={() => this.EditUser()} />
          </View>
        </KeyboardAwareScrollView>
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
  calendar: {position: 'absolute', right: 30, bottom: 15, zIndex: 1},
  account: {
    fontSize: 16,
    lineHeight: 24,
    color: '#98A6AE',
    textAlign: 'left',
    fontWeight: '400',

    fontFamily: 'Poppins-Regular',
  },
  signin: {
    fontSize: 16,
    lineHeight: 24,
    color: '#7200FD',
    textAlign: 'left',
    fontWeight: '700',
    fontFamily: 'Poppins-Regular',
  },
});

const mapStateToProps = (state, ownProps) => ({
  // access or fetch
  userToken: state.authReducer.token,
});

const mapDispatchToProps = {
  // to stored
  // setToken,
};

export default connect(mapStateToProps, mapDispatchToProps)(EditMemberProfile);
