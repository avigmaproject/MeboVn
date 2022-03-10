import React, {Component} from 'react';
import {
  Text,
  View,
  SafeAreaView,
  Image,
  StyleSheet,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  Button,
  Alert,
} from 'react-native';

import Feather from 'react-native-vector-icons/Feather';
import {connect} from 'react-redux';
import moment from 'moment';
import LinearGradient from 'react-native-linear-gradient';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import {signout, userId} from '../../../store/action/auth/action';
import GradientText from '../../../components/GradientText';
import {getusermaster} from '../../../services/api/api.function';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

class MemberProfile extends Component {
  constructor() {
    super();
    this.state = {
      fullname: '',
      email: '',
      phone: null,
      address: '',
      since: '',
      member: null,
      npn: null,
      location: '',
      dob: '',
      imagepath: '',
      memberid: null,
      loading: false,
      stateList: [],
      open: false,
      value: null,
    };
  }

  componentDidMount() {
    const {navigation} = this.props;
    this._unsubscribe = navigation.addListener('focus', () => {
      this.getMemberData();
    });
  }

  componentWillUnmount() {
    this._unsubscribe;
  }

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
        member: res[0][0].User_MemberID,
        location: res[0][0].User_Location,
        dob: res[0][0].User_DOB,
        imagepath: res[0][0].User_Image_Path,
      });
    } catch (error) {
      console.log('hihihihihihih', {e: error.response.data.error});
    }
  };

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
      member,
      imagepath,
      dob,
    } = this.state;
    const {navigation} = this.props;
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: '#FAFAFA'}}>
        <View style={{marginTop: 10, marginLeft: 20, flexDirection: 'row'}}>
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
          <View style={{marginLeft: 20, marginTop: 10}}>
            <Text style={styles.info}>Member Info</Text>
          </View>
          <View style={styles.box}>
            <View style={styles.boxcontain}>
              <Text style={styles.title}>Name : </Text>
              <Text style={styles.data}> {fullname}</Text>
            </View>
            <View style={styles.boxcontain}>
              <Text style={styles.title}>Since : </Text>
              <Text style={styles.data}>
                {since === '' ? 'NA' : moment(since).format('DD/MM/YYYY')}
              </Text>
            </View>
            <View style={styles.boxcontain}>
              <Text style={styles.title}>Phone no. : </Text>
              <Text style={styles.data}> {phone}</Text>
            </View>
            <View style={styles.boxcontain}>
              <Text numberOfLines={1} ellipsizeMode="tail" style={styles.title}>
                Email Address :
              </Text>
              <Text numberOfLines={1} ellipsizeMode="tail" style={styles.data}>
                {email}
              </Text>
            </View>
            {/* <View style={styles.boxcontain}>
              <Text style={styles.title}>NPN :</Text>
              <Text style={styles.data}> {npn}</Text>
            </View> */}
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
              <Text style={styles.title}>Member ID : </Text>
              <Text style={styles.data}>{member}</Text>
            </View>
            <View style={styles.boxcontain}>
              <Text style={styles.title}>Location : </Text>
              <Text style={styles.data}> {location}</Text>
            </View>
          </View>

          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('EditMemberProfile')}>
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
    height: windowHeight / 4,
    borderWidth: 1,
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
    height: '50%',
    width: '90%',
    backgroundColor: '#FAFAFA',
    borderColor: '#9C9C9C',
  },
  boxcontain: {
    flexDirection: 'row',
    marginTop: 20,
    marginLeft: 20,
    width: '75%',
  },
  title: {
    fontSize: 16,
    lineHeight: 24,
    color: '#2F4955',
    fontWeight: '500',
    fontFamily: 'Poppins-Regular',
    bottom: 0.5,
    width: '50%',
  },
  data: {
    fontSize: 16,
    lineHeight: 24,
    color: '#2F4955',
    fontWeight: '700',
    fontFamily: 'Poppins-Regular',
    bottom: 1,
    width: '50%',
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
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    flexDirection: 'row',
    marginLeft: 20,
    marginTop: 20,
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
});

const mapStateToProps = (state, ownProps) => ({
  // access or fetch
  userToken: state.authReducer.token,
});

const mapDispatchToProps = {
  signout,
};

export default connect(mapStateToProps, mapDispatchToProps)(MemberProfile);
