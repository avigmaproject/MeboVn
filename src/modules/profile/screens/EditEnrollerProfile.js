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
import {
  adduser,
  createupdateenroller,
  getstate,
  getenrollermaster,
} from '../../../services/api/api.function';
import GradientText from '../../../components/GradientText';

import axios from 'axios';
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
import DropDownPicker from 'react-native-dropdown-picker';
import DocumentPicker from 'react-native-document-picker';
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

class EditEnrollerProfile extends Component {
  constructor() {
    super();
    this.state = {
      isShowPassword: true,
      isShowConfirmPassword: true,
      isDatePickerVisible: false,
      fullname: '',
      email: '',
      password: '',
      phone: null,
      address: '',
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
      states: [],
      dobboolean: false,
      sinceboolean: false,
      medicalboolean: false,
      result: [],
      multipleFile: [],
      arrayofstates: [],
      arrayofdocuments: [],
      id: null,
      stateData: [],
      states_name: [],
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
      this.setState(
        {
          stateData: res[0],
          stateList: itemlist,
          loading: false,
        },
        () => this.getEnrollerData(),
      );
      console.log(res);
    } catch (error) {
      console.log('hihihihihihih', {e: error.response.data.error});
      this.setState({loading: false});
    }
  };

  fileterdStates = () => {
    const {stateData, arrayofstates} = this.state;

    let identicalElements = [];

    stateData.forEach(element1 => {
      arrayofstates.forEach(element2 => {
        if (element1.SD_PkeyID === element2.ESD_SD_PkeyID)
          identicalElements.push(element1.SD_Name);
      });
    });

    this.setState({states_name: identicalElements});
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
        console.log(data, 'documents');
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
            console.log(response.data.Data[0], 'Hiiii');
            response_data = response.data.Data[0]['url'];
            response_name = response.data.Data[0]['name'];
            if (this.state.arrayofdocuments.length === 0) {
              console.log(response_data, 'response_data1');
              var document_value = {
                END_ImagePath: response_data,
                END_ImageName: response_name,
                END_Number: 1,
                Type: 1,
              };
            } else {
              console.log(response_data, 'response_data2');
              var document_value = {
                END_ImagePath: response_data,
                END_ImageName: response_name,
                END_Number: this.state.arrayofdocuments.length + 1,
                Type: 1,
              };
            }
            this.state.arrayofdocuments.push(document_value);
            console.log(document_value, 'document_value');
            this.showMessage(response.data.Data[0]['name'] + ' Uploaded');
          })
          .catch(error => {
            console.log(error);
          });
      }

      console.log(this.state.arrayofdocuments, 'arrayofdocuments');
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log('Canceled from multiple doc picker');
      } else {
        console.log('Unknown Error: ' + JSON.stringify(err));
        throw err;
      }
    }
  };

  setOpen() {
    this.setState({
      open: !this.state.open,
    });
  }

  validation = () => {
    const {fullname, phone} = this.state;
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

  getEnrollerData = async () => {
    console.log(this.props.userToken, 'this.props.userToken;');

    var data = JSON.stringify({
      Type: 2,
    });
    try {
      const res = await getenrollermaster(data, this.props.userToken);
      console.log(res, 'ressssssss');
      this.setState(
        {
          email: res[0][0].EN_Email,
          fullname: res[0][0].EN_Name,
          phone: res[0][0].EN_Phone,
          password: res[0][0].EN_Password,
          address: res[0][0].EN_Email,
          since: res[0][0].EN_Since,
          medicaldate: res[0][0].EN_Medical_Cont_Date,
          npn: res[0][0].EN_NPN,
          location: res[0][0].EN_Location,
          dob: res[0][0].EN_DOB,
          imagepath: res[0][0].EN_ImagePath,
          id: res[0][0].EN_PkeyID,
          arrayofstates: res[0][0].enroller_State_Details_DTOs,
          arrayofdocuments: res[0][0].enroller_Document_DTOs,
        },
        () => this.fileterdStates(),
      );
    } catch (error) {
      console.log('hihihihihihih', {e: error.response.data.error});
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

  EditEnroller = async () => {
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
      states,
      stateData,
      arrayofstates,
      arrayofdocuments,
      id,
    } = this.state;
    if (this.validation() && this.phoneValidation()) {
      const ESD_SD_PkeyID = null;
      if (states !== null) {
        console.log(states, 'states');
        states.map(value => {
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
        EN_Password: password,
        str_Enroller_State_Details_DTO: JSON.stringify(arrayofstates),
        str_Enroller_Document_DTO: JSON.stringify(arrayofdocuments),
        Type: 2,
        EN_PkeyID: this.state.id,
        EN_IsActive: 1,
        EN_IsDelete: 0,
      };
      console.log(data, 'enrollerdata');
      try {
        // const token = await AsyncStorage.getItem('token');
        const res = await createupdateenroller(data, this.props.userToken);
        console.log('ressssss:', res);
        console.log('Profile Updated');
        this.setState({loading: false});
        navigation.navigate('EnrollerProfile');
      } catch (error) {
        console.log(error.response.data.error_description);
        this.setState({loading: false});
      }
    }
  };

  renderStates = (item, key) => {
    return (
      <View style={styles.backgroundstates}>
        <GradientText style={styles.TextStyle}>{item}</GradientText>
      </View>
    );
  };

  renderDocuments = (item, key) => {
    return (
      <View style={styles.backgrounddocuments}>
        <View>
          <GradientText style={styles.TextStyle}>
            {item.END_ImageName}
          </GradientText>
        </View>
      </View>
    );
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
      states_name,
      arrayofdocuments,
    } = this.state;
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: '#FAFAFA'}}>
        <Header onPress={() => navigation.goBack()} text="Edit Profile" />
        <KeyboardAwareScrollView keyboardShouldPersistTaps="handled">
          <Spinner visible={loading} color="#5B0BBC" />
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
              label="Phone Number"
              value={phone}
              onChangeText={phone => this.setState({phone})}
              keyboardType="numeric"
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
              label="Since"
              value={since}
              keyboardType="numeric"
              editable={false}
            />
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
            <TextField
              label="Date of Birth"
              value={dob}
              keyboardType="numeric"
              editable={false}
            />
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
            <TextField
              label="Medical contact date"
              value={medicaldate}
              keyboardType="numeric"
              editable={false}
            />
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
            {arrayofdocuments.map((item, key) =>
              this.renderDocuments(item, key),
            )}
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
                this.setState({states: value}, () => this.fileterdStates());
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
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
                paddingRight: 20,
                marginTop: 10,
              }}>
              <KeyboardAwareScrollView horizontal={true}>
                {states_name.map((item, key) => this.renderStates(item, key))}
              </KeyboardAwareScrollView>
            </View>
          </View>

          <View style={{marginTop: 20, marginBottom: 20}}>
            <Gradiant_Button
              text="Update"
              onPress={() => this.EditEnroller()}
            />
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
  TextStyle: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '600',
    fontFamily: 'Poppins-Regular',
    color: '#000',
  },
  backgroundstates: {
    backgroundColor: '#EFE6FA',
    // borderWidth: 1,
    height: 40,
    width: '25%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backgrounddocuments: {
    // backgroundColor: '#EFE6FA',
    // height: 40,
    // width: '60%',
    // alignItems: 'center',
    // justifyContent: 'center',
    marginLeft: 20,
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

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EditEnrollerProfile);
