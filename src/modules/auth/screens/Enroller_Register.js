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
  getstate,
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
import DropDownPicker from 'react-native-dropdown-picker';
import DocumentPicker from 'react-native-document-picker';
import * as RNFS from 'react-native-fs';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

class Enroller_Register extends Component {
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
      since: '',
      medicaldate: '',
      npn: null,
      location: '',
      dob: '',
      base64: '',
      filename: 'image',
      imagepath: '',
      memberid: null,
      loading: false,
      stateList: [],
      open: false,
      value: null,
      statedata: [],
      dobboolean: false,
      sinceboolean: false,
      medicalboolean: false,
      result: [],
      multipleFile: [],
      arrayofstates: [],
      arrayofdocuments: [],
    };
    this.setValue = this.setValue.bind(this);
  }

  setValue(callback) {
    this.setState(state => ({
      value: callback(state.value),
    }));
    console.log(this.state.value, 'this.state.value');
  }

  setItems(callback) {
    this.setState(state => ({
      stateList: callback(state.stateList),
    }));
  }

  componentDidMount() {
    const {navigation} = this.props;
    this._unsubscribe = navigation.addListener('focus', () => {
      this.getStateMaster();
    });
  }

  componentWillUnmount() {
    this._unsubscribe;
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
    const {dobboolean, sinceboolean, medicalboolean, since, dob, medicaldate} =
      this.state;
    if (dobboolean === true) {
      this.setState({
        dob: moment(date).format(''),
      });
    } else if (sinceboolean === true) {
      this.setState({
        since: moment(date).format(''),
      });
    } else if (medicalboolean === true) {
      this.setState({
        medicaldate: moment(date).format(''),
      });
    }

    this.hideDatePicker();
  };

  showActionSheet = () => {
    this.ActionSheet.show();
  };

  getStateMaster = async () => {
    this.setState({loading: true});
    let data = {
      Type: 1,
    };
    try {
      const res = await getstate(data);
      const itemlist = res[0].map(item => ({
        label: item.SD_Name,
        value: item.SD_PkeyID,
      }));
      this.setState({
        stateList: itemlist,
        loading: false,
      });
    } catch (error) {
      console.log('hihihihihihih', {e: error.response.data.error});
      this.setState({loading: false});
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

      this.setState({imagepath: res[1], loading: false});
      AsyncStorage.setItem('image', imagepath);
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

  selectMultipleFile = async () => {
    try {
      const results = await DocumentPicker.pickMultiple();
      for (const res of results) {
        var data = new FormData();
        data.append('uri', res);
        data.append('Type', '1');

        var config = {
          method: 'post',
          url: 'http://mebovanapi.ikaart.org/api/mebovan/UploadDocuments',
          headers: {
            'Content-Type': 'multipart/form-data',
            Accept: 'application/json',
          },
          data: data,
        };

        const response_data = '';
        const response_name = '';

        axios(config)
          .then(response => {
            response_data = response.data.Data[0]['url'];
            response_name = response.data.Data[0]['name'];
            if (this.state.arrayofdocuments.length === 0) {
              var document_value = {
                END_ImagePath: response_data,
                END_ImageName: response_name,
                END_Number: 1,
                Type: 1,
              };
            } else {
              var document_value = {
                END_ImagePath: response_data,
                END_ImageName: response_name,
                END_Number: this.state.arrayofdocuments.length + 1,
                Type: 1,
              };
            }
            this.state.arrayofdocuments.push(document_value);

            this.showMessage(response.data.Data[0]['name'] + ' Uploaded');
          })
          .catch(error => {
            console.log(error);
          });
      }
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log('Canceled from multiple doc picker');
      } else {
        console.log('Unknown Error: ' + JSON.stringify(err));
        throw err;
      }
    }
  };

  AddEnroller = async () => {
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
      npn,
      location,
      medicaldate,
      imagepath,
      dob,
      statedata,
      arrayofstates,
      arrayofdocuments,
    } = this.state;
    if (
      this.validation() &&
      this.passwordCheck() &&
      this.checkPassEmail(email, confirmpassword) &&
      this.phoneValidation()
    ) {
      const ESD_SD_PkeyID = null;
      if (statedata !== null) {
        statedata.map(value => {
          var states_value = {
            ESD_SD_PkeyID: value,
            Type: 1,
          };
          arrayofstates.push(states_value);
        });
      }

      this.setState({loading: true});
      let data = {
        EN_Name: fullname,
        EN_Since: since,
        EN_Phone: phone,
        EN_Email: email,
        EN_Password: confirmpassword,
        EN_NPN: npn,
        EN_Medical_Cont_Date: medicaldate,
        EN_ImagePath: imagepath,
        EN_DOB: dob,
        EN_Location: location,
        str_Enroller_State_Details_DTO: JSON.stringify(arrayofstates),
        str_Enroller_Document_DTO: JSON.stringify(arrayofdocuments),
        Type: 1,
        EN_IsActive: 1,
        EN_IsDelete: 0,
      };

      try {
        // const token = await AsyncStorage.getItem('token');
        const res = await createupdateenroller(data);

        console.log('Profile Updated');
        this.onEnrollerRegister();
        this.setState({loading: false});
      } catch (error) {
        console.log(error.response.data.error_description);
        this.setState({loading: false});
      }
    }
  };

  onEnrollerRegister = async () => {
    this.setState({loading: true});
    let data = qs.stringify({
      username: this.state.email,
      password: this.state.confirmpassword,
      clientid: 2,
      grant_type: 'password',
    });
    await register(data)
      .then(res => {
        this.props.setToken(res.access_token);
        this.showMessage('Account created successfully');
        this.setState({loading: false});
        // AsyncStorage.setItem('token', res.access_token);
        this.props.navigation.navigate('EnrollerProfile');
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
    const {fullname, email, phone, password, confirmpassword} = this.state;
    let cancel = false;
    if (fullname.length === 0) {
      cancel = true;
    }
    if (email.length === 0) {
      cancel = true;
    }
    if (phone === null) {
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

  phoneValidation = () => {
    const {phone} = this.state;
    if (phone.length != 10) {
      this.showMessage('Please enter valid phone number');
      return false;
    } else {
      return true;
    }
  };

  setOpen() {
    this.setState({
      open: !this.state.open,
    });
  }

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
      npn,
      location,
      imagepath,
      dob,
      medicaldate,
      loading,
      stateList,
      open,
      value,
      arrayofdocuments,
    } = this.state;
    const user = this.props.userType;
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: '#FFFFFF'}}>
        <Header />
        <KeyboardAwareScrollView keyboardShouldPersistTaps="handled">
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
              label="Full Name*"
              value={fullname}
              onChangeText={fullname => this.setState({fullname})}
            />
          </View>
          <View style={{marginTop: 20}}>
            <TextField
              label="Phone Number*"
              value={phone}
              onChangeText={phone => this.setState({phone})}
              keyboardType="numeric"
            />
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
            <TouchableOpacity
              onPress={() =>
                this.setState(
                  {
                    medicalboolean: false,
                    dobboolean: false,
                    sinceboolean: true,
                  },
                  this.showDatePicker(),
                )
              }>
              <TextField
                label="Since"
                value={since}
                keyboardType="numeric"
                editable={false}
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.calendar}
              onPress={() =>
                this.setState(
                  {
                    medicalboolean: false,
                    dobboolean: false,
                    sinceboolean: true,
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
            maximumDate={new Date(Date.now() - 86400000)}
            onConfirm={date => this.handleConfirm(date, value)}
            onCancel={() => this.hideDatePicker()}
          />
          <View style={{marginTop: 20}}>
            <TouchableOpacity
              onPress={() =>
                this.setState(
                  {
                    dobboolean: true,
                    sinceboolean: false,
                    medicalboolean: false,
                  },
                  this.showDatePicker(),
                )
              }>
              <TextField
                label="Date of Birth"
                value={dob}
                keyboardType="numeric"
                editable={false}
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.calendar}
              onPress={() =>
                this.setState(
                  {
                    dobboolean: true,
                    sinceboolean: false,
                    medicalboolean: false,
                  },
                  this.showDatePicker(),
                )
              }>
              <AntDesign name="calendar" color="#36596A" size={26} />
            </TouchableOpacity>
          </View>

          <View style={{marginTop: 20}}>
            <TouchableOpacity
              onPress={() =>
                this.setState(
                  {
                    dobboolean: false,
                    sinceboolean: false,
                    medicalboolean: true,
                  },
                  this.showDatePicker(),
                )
              }>
              <TextField
                label="Medical contact date"
                value={medicaldate}
                keyboardType="numeric"
                editable={false}
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.calendar}
              onPress={() =>
                this.setState(
                  {
                    dobboolean: false,
                    sinceboolean: false,
                    medicalboolean: true,
                  },
                  this.showDatePicker(),
                )
              }>
              <AntDesign name="calendar" color="#36596A" size={26} />
            </TouchableOpacity>
          </View>

          <View style={{marginTop: 20}}>
            <TextField
              label="NPN"
              value={npn}
              onChangeText={npn => this.setState({npn})}
              keyboardType="numeric"
            />
          </View>
          <View style={{marginTop: 20}}>
            <TextField
              label="Location"
              value={location}
              onChangeText={location => this.setState({location})}
            />
          </View>
          <View style={{marginTop: 20, marginLeft: 20}}>
            <Text style={styles.desc}>Documents</Text>
            <View style={styles.document}>
              <View style={styles.docs}>
                <TouchableOpacity onPress={() => this.selectMultipleFile()}>
                  <Ionicons
                    name="cloud-upload-outline"
                    color="#6101D8"
                    size={75}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View style={{marginTop: 20, marginLeft: 20}}>
            {/* <Text style={styles.desc}>Select States</Text> */}

            <DropDownPicker
              multiple={true}
              min={0}
              max={5}
              open={open}
              value={value}
              items={stateList}
              setOpen={() => this.setOpen()}
              setValue={this.setValue}
              setItems={this.setItems}
              searchable={true}
              listMode={'MODAL'}
              placeholder="Select States"
              onChangeValue={value => {
                this.setState({statedata: value});
              }}
              style={styles.dropdownstyle}
              textStyle={styles.dropdowntext}
              containerStyle={styles.dropdowncontainer}
              placeholderStyle={styles.dropdownplaceholder}
              searchPlaceholder="Search..."
              searchTextInputStyle={{
                borderRadius: 0,
                height: 40,
              }}
            />
          </View>

          <View style={{marginTop: 20, marginBottom: 20}}>
            <Gradiant_Button
              text="Register"
              onPress={() => this.AddEnroller()}
            />
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: 10,
              marginBottom: 10,
            }}>
            <Text style={styles.account}>Already have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
              <Text style={styles.signin}>Sign In</Text>
            </TouchableOpacity>
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
  dropdownstyle: {
    borderRadius: 0,
    borderBottomWidth: 2,
    borderColor: '#ffffff',
    paddingHorizontal: 0,
    backgroundColor: '#ffffff',
    height: 60,
    width: '90%',
    paddingLeft: 20,
  },
  dropdowntext: {
    color: '#36596A',
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '600',
    fontFamily: 'Poppins-Regular',
  },
  dropdowncontainer: {
    backgroundColor: '#ffffff',
    width: '90%',
    borderRadius: 0,
  },
  dropdownplaceholder: {
    color: '#ACACAC',
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '600',
    fontFamily: 'Poppins-Regular',
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

export default connect(mapStateToProps, mapDispatchToProps)(Enroller_Register);
