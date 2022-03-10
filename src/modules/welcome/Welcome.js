import React, {Component} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  ScrollView,
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import Gradiant_Button from '../../components/Gradiant_Button';

import {connect} from 'react-redux';

import Button from '../../components/Button';
import {setUserType} from '../../store/action/auth/action';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

class Welcome extends Component {
  onMemberClick = () => {
    this.props.setUserType(true);
    this.props.navigation.navigate('SignIn');
  };
  onEnrollerClick = () => {
    this.props.setUserType(false);
    this.props.navigation.navigate('SignIn');
  };

  render() {
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: '#FAFAFA'}}>
        <ScrollView>
          <View>
            <Image
              source={require('../../assets/welcome_image/Rectangle.png')}
              style={styles.header}
            />
            <Image
              source={require('../../assets/splashscreen_images/logo.png')}
              style={styles.monster}
            />
            <Image
              source={require('../../assets/splashscreen_images/car.png')}
              style={styles.car}
            />
          </View>
          <View style={{marginTop: 75}}>
            <Text style={styles.welcometext}>Welcome </Text>
            <Text style={styles.welcometext}>Our Mebo Family</Text>
          </View>
          <View style={{marginTop: 10}}>
            <Text style={styles.desctext}>
              Are you an enroller or a member?
            </Text>
          </View>
          <View style={{marginTop: 75}}>
            <Gradiant_Button
              text="Mebo Member"
              onPress={() => this.onMemberClick()}
            />
          </View>
          <View style={{marginTop: 25, marginBottom: 25}}>
            <Button
              backgroundColor="#FFFFFF"
              text="As a Enroller"
              onPress={() => this.onEnrollerClick()}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    width: windowWidth,
    height: windowHeight / 3.5,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
  },
  monster: {
    position: 'absolute',
    height: windowHeight / 11,
    width: windowWidth / 1.7,
    alignSelf: 'center',
    top: 75,
  },
  car: {
    position: 'absolute',
    height: 87,
    width: 165,
    bottom: -10,
  },
  welcometext: {
    fontSize: 30,
    lineHeight: 44,
    color: '#264653',
    textAlign: 'center',
    fontWeight: '700',
    fontFamily: 'Poppins-Regular',
  },
  desctext: {
    fontSize: 16,
    lineHeight: 26,
    color: '#98A6AE',
    textAlign: 'center',
    fontWeight: '400',
    fontFamily: 'Poppins-Regular',
  },
});

const mapDispatchToProps = {
  // to stored
  setUserType,
};
export default connect(null, mapDispatchToProps)(Welcome);
