import React, {Component} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default class SplashScreen1 extends Component {
  componentDidMount() {
    setTimeout(() => {
      this.props.navigation.navigate('sliderpage');
    }, 2500);
  }
  render() {
    return (
      <LinearGradient colors={['#222439', '#5B0BBC']} style={styles.background}>
        <SafeAreaView>
          <Image
            source={require('../../assets/splashscreen_images/Group.png')}
            style={styles.backhome}
          />
          <View style={styles.viewblack}>
            <Image
              source={require('../../assets/splashscreen_images/BlackBg.png')}
              style={styles.blackbg}
            />
          </View>
          <View style={styles.viewwhite}>
            <Image
              source={require('../../assets/splashscreen_images/WhiteBg.png')}
              style={styles.whitebg}
            />
          </View>

          <Image
            source={require('../../assets/splashscreen_images/logo.png')}
            style={styles.logo}
          />
          <Image
            source={require('../../assets/splashscreen_images/car.png')}
            style={styles.car}
          />
        </SafeAreaView>
      </LinearGradient>
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
    bottom: 130,
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewwhite: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  car: {
    height: windowHeight / 6,
    width: windowWidth / 1.5,
    position: 'absolute',
    bottom: 50,
  },
  blackbg: {
    height: 300,
    width: 300,
  },
  whitebg: {
    height: 300,
    width: 300,
  },
  logo: {
    height: windowHeight / 11.5,
    width: windowWidth / 1.75,
    position: 'absolute',
    alignSelf: 'center',
    justifyContent: 'center',
    top: 350,
  },
});
