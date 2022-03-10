import React, {Component} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Button,
  Dimensions,
  FlatList,
  Image,
} from 'react-native';

import Gradiant_Button from '../../../components/Gradiant_Button';
import GradientText from '../../../components/GradientText';
import {signout, userId} from '../../../store/action/auth/action';
import Header from '../components/Header';
import {getuserhome} from '../../../services/api/api.function';

import {connect} from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import moment from 'moment';
import AsyncStorage from '@react-native-async-storage/async-storage';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

class Homepage extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      since: null,
      phone: null,
      planData: [],
      imagepath: '',
    };
  }
  componentDidMount() {
    const {navigation} = this.props;
    this._unsubscribe = navigation.addListener('focus', () => {
      this.getUserHome();
      this.getImage();
    });
  }

  componentWillUnmount() {
    this._unsubscribe;
  }

  getImage = async () => {
    const Image = await AsyncStorage.getItem('image');
    this.setState({imagepath: Image});
    console.log(Image, 'Imagpath');
  };

  getUserHome = async () => {
    console.log(this.props.userToken, 'this.props.userToken;');
    const {name, since, phone} = this.state;
    var data = JSON.stringify({
      Type: 1,
    });
    try {
      const res = await getuserhome(data, this.props.userToken);
      console.log(res[0][0], 'Rishabh');
      this.setState({
        name: res[0][0].User_FullName,
        since: res[0][0].User_Since,
        phone: res[0][0].User_Phone,
        planData: res[1],
      });
      console.log(res[1], 'Jain');
    } catch (error) {
      console.log('hihihihihihih', {e: error.response.data.error});
    }
  };

  renderItem = ({item}) => {
    const {navigation} = this.props;
    const {name} = this.state;

    return (
      <TouchableOpacity
        style={styles.card}
        onPress={
          item.Status_Enroll === 1
            ? () => navigation.navigate('Medical_Detail', {item, name})
            : null
        }>
        <View style={{flexDirection: 'row'}}>
          <Image source={{uri: item.Pro_ImagePath}} style={styles.image} />
          <View style={{width: '70%', padding: 10}}>
            <Text style={styles.title}>{item.Pro_Name}</Text>
            {item.Status_Enroll === 0 ? (
              <Text style={styles.plan}>Not Enrolled</Text>
            ) : (
              <View style={{flexDirection: 'row'}}>
                <Image
                  source={require('../assets/Gold.png')}
                  style={{top: 3}}
                />
                <Text style={styles.plan}>Gold Pro Plan</Text>
              </View>
            )}
          </View>
          <View style={{right: 0, position: 'absolute', alignSelf: 'center'}}>
            <GradientText style={styles.dollar}>
              $ {item.UP_Amount}
            </GradientText>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  render() {
    const {navigation} = this.props;
    const {name, since, phone, planData, imagepath} = this.state;

    return (
      <SafeAreaView style={{flex: 1, backgroundColor: '#FAFAFA'}}>
        <Header
          onPress={() => navigation.navigate('MemberProfile')}
          image={{
            uri: imagepath
              ? imagepath
              : 'https://t4.ftcdn.net/jpg/03/32/59/65/360_F_332596535_lAdLhf6KzbW6PWXBWeIFTovTii1drkbT.jpg',
          }}
        />
        <View style={styles.name}>
          <Text style={styles.text}>Name : {name}</Text>
          <Text style={styles.text}>
            Since : {moment(since).format('DD/MM/YYYY')}
          </Text>
          <Text style={styles.text}>Phone no. : {phone}</Text>
          {/* <View
            style={{alignItems: 'center', justifyContent: 'center', flex: 3}}> */}

          {/* </View> */}
        </View>
        <View
          style={{
            padding: 25,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <View>
            <Text style={styles.text}>Monthly Premium</Text>
            <GradientText style={styles.dollar}>$253.00</GradientText>
          </View>
          <TouchableOpacity>
            <LinearGradient
              colors={['#7200FD', '#3B0186']}
              style={styles.button}>
              <Text style={styles.changebutton}>Change Method</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
        <FlatList
          data={planData}
          renderItem={item => this.renderItem(item)}
          keyExtractor={item => item.Pro_PkeyID}
          // extraData={selectedId}
        />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  name: {
    backgroundColor: '#E5E5E5',
    width: '90%',
    // borderWidth: 1,
    height: windowHeight / 6,
    marginTop: 20,
    alignSelf: 'center',
    padding: 25,
  },
  image: {
    height: 80,
    width: 80,
    borderRadius: 1,
    borderColor: '#BDBDBD',
    borderWidth: 1,
    top: 0,
  },
  text: {
    color: '#2F4955',
    fontFamily: 'Poppins-Regular',
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 24,
  },
  button: {
    width: '135%',
    alignSelf: 'center',
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 2,
    right: 20,
    top: 5,
  },
  changebutton: {
    color: '#FAFAFA',
    fontFamily: 'Poppins-Regular',
    fontWeight: '500',
    fontSize: 14,
    lineHeight: 18,
  },
  dollar: {
    // color: '#FAFAFA',
    fontFamily: 'Poppins-Regular',
    fontWeight: '700',
    fontSize: 18,
    lineHeight: 27,
  },
  card: {
    backgroundColor: '#E5E5E5',
    width: '90%',
    // borderWidth: 1,
    height: 100,
    marginTop: 20,
    alignSelf: 'center',
    justifyContent: 'center',
    padding: 10,
    borderRadius: 3,
    shadowColor: 'grey',
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowOffset: {
      height: 2,
      width: 2,
    },
  },
  title: {
    color: '#2F4955',
    fontFamily: 'Poppins-Regular',
    fontWeight: '600',
    fontSize: 18,
    lineHeight: 27,
  },
  plan: {
    color: '#264653',
    fontFamily: 'Poppins-Regular',
    fontWeight: '400',
    fontSize: 12,
    lineHeight: 18,
    left: 5,
  },
});

const mapDispatchToProps = {
  signout,
  userId,
};
const mapStateToProps = (state, ownProps) => ({
  userToken: state.authReducer.token,
});
export default connect(mapStateToProps, mapDispatchToProps)(Homepage);
