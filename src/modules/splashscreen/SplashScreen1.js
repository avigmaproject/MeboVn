import React, {Component} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  AppState,
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import dynamicLinks from '@react-native-firebase/dynamic-links';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default class SplashScreen1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      appState: 'active',
    };
  }

  _getInitialUrl = async () => {
    const url = dynamicLinks().onLink(this.handleDynamicLink);
    this.setState({
      linkdata: url,
    });
  };
  componentWillUnmount() {
    AppState.removeEventListener('change', this._handleAppStateChange);
  }

  _handleAppStateChange = async nextAppState => {
    if (
      this.state.appState.match(/inactive|background/) &&
      nextAppState === 'active'
    ) {
      this._getInitialUrl();
    }
  };
  handleDynamicLink = link => {
    if (link.url.includes('CreateUpdateBinMaster')) {
      this.props.navigation.navigate('ShowBinData', {link: link.url});
    } else {
      this.props.navigation.navigate('ResetPassword', {link: link.url});
    }
  };

  substring = () => {
    console.log(this.state.linkdata, 'substring');
  };
  componentDidMount = async () => {
    setTimeout(() => {
      this.props.navigation.navigate('sliderpage');
    }, 3000);
    this._getInitialUrl();
    this.substring();
    AppState.addEventListener('change', this._handleAppStateChange);
    await dynamicLinks()
      .getInitialLink()
      .then(link => {
        if (link) {
          console.log('Loginlink', link);
          this.props.navigation.navigate('ResetPassword', {link: link.url});
        }
        console.log('Loginlinklink', link);
      });
  };
  render() {
    return (
      // <SafeAreaView style={styles.background}>
      <LinearGradient colors={['#222439', '#5B0BBC']} style={styles.background}>
        <Image
          source={require('../../assets/splashscreen_images/Group.png')}
          style={styles.backhome}
        />
        <View style={styles.viewblack}>
          <Image
            source={require('../../assets/splashscreen_images/BlackBg.png')}
            style={styles.blackbg}
            resizeMode="contain"
          />
        </View>
        <View style={styles.viewwhite}>
          <Image
            source={require('../../assets/splashscreen_images/WhiteBg.png')}
            style={styles.whitebg}
            resizeMode="contain"
          />
          <Image
            source={require('../../assets/splashscreen_images/logo.png')}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>

        <Image
          source={require('../../assets/splashscreen_images/car.png')}
          style={styles.car}
        />
      </LinearGradient>
      // </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    alignItems: 'center',
  },
  backhome: {width: windowWidth, height: windowHeight},
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
    bottom: 0,
    left: 0,
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
    height: windowHeight / 10,
    width: windowWidth / 1.5,
    // top: 350,
    position: 'absolute',
  },
});
