import React, {Component} from 'react';
import {
  Text,
  View,
  SafeAreaView,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Button,
  Alert,
} from 'react-native';

import Feather from 'react-native-vector-icons/Feather';
import {connect} from 'react-redux';
import moment from 'moment';
import LinearGradient from 'react-native-linear-gradient';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import GradientText from '../../../components/GradientText';
import {getenrollermaster, getstate} from '../../../services/api/api.function';
import {signout, userId} from '../../../store/action/auth/action';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

class EnrollerProfile extends Component {
  constructor() {
    super();
    this.state = {
      fullname: '',
      email: '',
      phone: null,
      address: '',
      since: '',
      medicaldate: '',
      npn: null,
      location: '',
      dob: '',
      imagepath: '',
      memberid: null,
      loading: false,
      stateList: [],
      open: false,
      value: null,
      statedata: [],
      result: [],
      multipleFile: [],
      arrayofstates: [],
      arrayofdocuments: [],
      states_name: [],
    };
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

  Logout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [{text: 'LOGOUT', onPress: () => this.logoutUser()}, {text: 'CANCEL'}],
      {cancelable: false},
    );
  };
  logoutUser = async () => {
    this.props.signout();
  };

  getEnrollerData = async () => {
    console.log(this.props.userToken, 'this.props.userToken;');
    const {stateList, arrayofstates} = this.state;
    var data = JSON.stringify({
      Type: 2,
    });
    try {
      const res = await getenrollermaster(data, this.props.userToken);
      // console.log(res[0][0], 'ressssssss');
      this.setState(
        {
          email: res[0][0].EN_Email,
          fullname: res[0][0].EN_Name,
          phone: res[0][0].EN_Phone,
          address: res[0][0].EN_Email,
          since: res[0][0].EN_Since,
          medicaldate: res[0][0].EN_Medical_Cont_Date,
          npn: res[0][0].EN_NPN,
          location: res[0][0].EN_Location,
          dob: res[0][0].EN_DOB,
          imagepath: res[0][0].EN_ImagePath,
          arrayofstates: res[0][0].enroller_State_Details_DTOs,
          arrayofdocuments: res[0][0].enroller_Document_DTOs,
        },
        () => this.fileterdStates(),
      );
    } catch (error) {
      console.log('hihihihihihih', {e: error.response.data.error});
    }
  };

  getStateMaster = async () => {
    this.setState({loading: true});
    let data = {
      Type: 1,
    };
    try {
      const res = await getstate(data);
      this.setState(
        {
          stateList: res[0],
          loading: false,
        },
        () => this.getEnrollerData(),
      );
      // console.log(res, 'states');
    } catch (error) {
      console.log('hihihihihihih', {e: error.response.data.error});
      this.setState({loading: false});
    }
  };

  fileterdStates = () => {
    const {stateList, arrayofstates} = this.state;

    let identicalElements = [];

    stateList.forEach(element1 => {
      arrayofstates.forEach(element2 => {
        if (element1.SD_PkeyID === element2.ESD_SD_PkeyID)
          identicalElements.push(element1.SD_Name);
      });
    });

    this.setState({states_name: identicalElements});
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
        <View style={{width: '70%'}}>
          <GradientText style={styles.TextStyle}>
            {item.END_ImageName}
          </GradientText>
        </View>
      </View>
    );
  };

  render() {
    const {
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
      states_name,
      arrayofdocuments,
    } = this.state;
    const {navigation} = this.props;
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: '#FAFAFA'}}>
        <View style={{marginTop: 10, marginLeft: 20}}>
          <Image
            source={require('../../../assets/splashscreen_images/logo.png')}
            style={styles.logo}
            resizeMode="contain"
          />
          <View style={{position: 'absolute', right: 30, top: 20}}>
            <Button title="logout" onPress={() => this.Logout()} />
          </View>
        </View>
        <KeyboardAwareScrollView>
          <View style={{marginTop: 20, marginLeft: 20, marginBottom: 10}}>
            {/* <Image
              source={require('../assets/Group.png')}
              style={styles.welcome}
              // resizeMode="contain"
            /> */}
            {/* <View style={styles.welcome}> */}
            <LinearGradient
              colors={['#3B0184', '#5D2D9A']}
              style={styles.welcome}>
              <Text style={styles.welcometext}>Welcome to Mebovan</Text>
              <Image
                source={require('../../../assets/splashscreen_images/car.png')}
                style={styles.car}
                resizeMode="contain"
              />
              <Image
                source={{
                  uri: imagepath
                    ? imagepath
                    : 'https://t4.ftcdn.net/jpg/03/32/59/65/360_F_332596535_lAdLhf6KzbW6PWXBWeIFTovTii1drkbT.jpg',
                }}
                style={styles.profile}
              />
              {/* </View> */}
            </LinearGradient>
          </View>
          <View style={{marginTop: 10, marginLeft: 20}}>
            <Text style={styles.info}>Enroller Info</Text>
          </View>
          <View style={styles.box}>
            <View style={styles.boxcontain}>
              <Text style={styles.title}>Name : </Text>
              <Text style={styles.data}>{fullname}</Text>
            </View>
            <View style={styles.boxcontain}>
              <Text style={styles.title}>Since : </Text>
              <Text style={styles.data}>
                {since === '' ? 'NA' : moment(since).format('DD/MM/YYYY')}
              </Text>
            </View>
            <View style={styles.boxcontain}>
              <Text style={styles.title}>Phone no. : </Text>
              <Text style={styles.data}>{phone}</Text>
            </View>
            <View style={styles.boxcontain}>
              <Text numberOfLines={1} ellipsizeMode="tail" style={styles.title}>
                Email Address :
              </Text>
              <Text numberOfLines={1} ellipsizeMode="tail" style={styles.data}>
                {email}
              </Text>
            </View>
            <View style={styles.boxcontain}>
              <Text style={styles.title}>NPN :</Text>
              <Text style={styles.data}>{npn}</Text>
            </View>
            {/* <View style={styles.boxcontain}>
              <Text style={styles.title}>Other info :</Text>
              <Text style={styles.data}> 125647</Text>
            </View> */}
            <View style={styles.boxcontain}>
              <Text style={styles.title}>Date of Birth : </Text>
              <Text style={styles.data}>
                {dob === '' ? 'NA' : moment(dob).format('DD/MM/YYYY')}
              </Text>
            </View>
            <View style={styles.boxcontain}>
              <Text style={styles.title}>Medical Contact Date : </Text>
              <Text style={styles.data}>
                {medicaldate === ''
                  ? 'NA'
                  : moment(medicaldate).format('DD/MM/YYYY')}
              </Text>
            </View>
            <View style={styles.boxcontain}>
              <Text style={styles.title}>Location : </Text>
              <Text style={styles.data}>{location}</Text>
            </View>
          </View>
          <View style={{marginLeft: 20, marginTop: 20}}>
            <Text style={styles.info}>Documents</Text>
          </View>
          <View style={styles.box2}>
            <View style={styles.box3}>
              <View
                style={{
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  padding: 20,
                }}>
                {arrayofdocuments.map((item, key) =>
                  this.renderDocuments(item, key),
                )}
              </View>
            </View>
          </View>
          <View style={{marginLeft: 20, marginTop: 20}}>
            <Text style={styles.info}>Select States</Text>

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
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('EditEnrollerProfile')}>
            <Feather
              name="edit"
              color="#6601E2"
              size={26}
              style={{right: 10}}
            />
            <GradientText style={styles.edit}>Edit Profile </GradientText>
          </TouchableOpacity>
        </KeyboardAwareScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  logo: {
    height: windowHeight / 12,
    width: windowWidth / 2,
    // top: 350,
  },
  car: {
    height: 100,
    width: '50%',
    position: 'absolute',
    bottom: 0,
    // height: windowHeight / 10,
    // width: windowWidth / 1,s
  },
  welcometext: {
    color: '#FFFFFF',
    fontSize: 20,
    lineHeight: 30,
    // fontWeight: '600',
    textAlign: 'center',
    fontFamily: 'Poppins-Bold',
    top: 25,
  },
  profile: {
    position: 'absolute',
    height: 80,
    width: 80,
    borderRadius: 40,
    bottom: 25,
    right: 50,
  },
  welcome: {
    width: '95%',
    height: windowHeight / 4.5,
    borderWidth: 1,
    // backgroundColor: '#3B0184',#5D2D9A
  },
  info: {
    fontSize: 18,
    lineHeight: 27,
    color: '#9C9C9C',
    fontWeight: '700',
    fontFamily: 'Poppins-Regular',
  },
  box: {
    marginTop: 20,
    marginLeft: 20,
    borderWidth: 1,
    height: '35%',
    width: '90%',
    backgroundColor: '#FAFAFA',
    borderColor: '#9C9C9C',
  },
  boxcontain: {
    flexDirection: 'row',
    marginTop: 20,
    marginLeft: 20,
  },
  title: {
    fontSize: 16,
    lineHeight: 24,
    color: '#2F4955',
    fontWeight: '500',
    fontFamily: 'Poppins-Regular',
    width: '50%',
  },
  data: {
    fontSize: 16,
    lineHeight: 24,
    color: '#2F4955',
    fontWeight: '700',
    fontFamily: 'Poppins-Regular',
    bottom: 1,
    width: '40%',
  },
  box2: {
    marginTop: 20,
    marginLeft: 20,
    borderWidth: 1,
    height: windowHeight / 4,
    width: '90%',
    backgroundColor: '#F9F9F9',
    borderColor: '#9C9C9C',
    alignItems: 'center',
    justifyContent: 'center',
  },
  box3: {
    borderWidth: 0.5,
    height: windowHeight / 5,
    width: '90%',
    backgroundColor: '#FFFFFF',
    borderColor: '#9C9C9C',
    // alignItems: 'flex-start',
    justifyContent: 'center',
  },
  button: {
    flexDirection: 'row',
    marginLeft: 20,
    marginTop: 40,
    marginBottom: 75,
    backgroundColor: '#EFE6FA',
    height: 65,
    width: '90%',
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  edit: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '700',
    fontFamily: 'Poppins-Regular',
    left: 5,
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
    // // borderWidth: 1,
    // height: 40,
    // width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const mapStateToProps = (state, ownProps) => ({
  // access or fetch
  userToken: state.authReducer.token,
});

const mapDispatchToProps = {
  signout,
};

export default connect(mapStateToProps, mapDispatchToProps)(EnrollerProfile);
