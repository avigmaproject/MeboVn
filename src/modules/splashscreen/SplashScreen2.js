import React, {Component} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
} from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default class SplashScreen extends Component {
  componentDidMount() {
    setTimeout(() => {
      this.props.navigation.navigate('sliderpage');
    }, 2500);
  }
  render() {
    return (
      <SafeAreaView style={styles.background}>
        <Image
          source={require('../../assets/splashscreen_images/Group.png')}
          style={styles.backhome}
        />
        <View style={styles.viewblack}>
          <Image
            source={require('../../assets/splashscreen_images/Bg.png')}
            style={styles.blackbg}
          />
        </View>
        <View style={styles.viewwhite}>
          <Image
            source={require('../../assets/splashscreen_images/Bg1.png')}
            style={styles.whitebg}
          />
        </View>
        <View style={styles.logoview}>
          <Image
            source={require('../../assets/splashscreen_images/logo.png')}
            style={styles.logo}
          />
        </View>
        <View style={styles.van}>
          <Image
            source={require('../../assets/splashscreen_images/car.png')}
            style={styles.car}
          />
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    alignItems: 'center',
  },
  backhome: {width: windowWidth},
  viewblack: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 120,
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewwhite: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 120,
    justifyContent: 'center',
    alignItems: 'center',
  },
  car: {
    height: windowHeight / 6,
    width: windowWidth / 1.5,
  },
  blackbg: {
    height: 300,
    width: 300,
  },
  whitebg: {
    height: 270,
    width: 300,
  },
  logo: {
    height: windowHeight / 11.5,
    width: windowWidth / 1.75,
  },
  logoview: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 125,
    justifyContent: 'center',
    alignItems: 'center',
  },
  van: {
    position: 'absolute',
    bottom: 0,
    left: 0,
  },
});
