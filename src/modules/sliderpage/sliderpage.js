import React, {Component} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  StatusBar,
} from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import {FAB} from 'react-native-paper';
import Icon from 'react-native-vector-icons/AntDesign';
import LinearGradient from 'react-native-linear-gradient';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const slides = [
  {
    key: 'one',
    title: 'Schedule Mebo',
    text: 'We are easy to reach! Text, call, email or use our mobile app to schedule a consultation with a licensed MEBO insurance agent.',
    image: require('../../assets/intro_images/WalkThrough1.png'),
  },
  {
    key: 'two',
    title: 'Come on inside',
    text: 'Our office comes to you! Learn all about the products and benefits available to you and your family.',
    image: require('../../assets/intro_images/WalkThrough2.png'),
  },
  {
    key: 'three',
    title: 'Sign In',
    text: 'Select from the insurance policy that fits your needs. We offer flexible payment options that make sense for your budget.',
    image: require('../../assets/intro_images/Frame.png'),
  },
  {
    key: 'four',
    title: 'Mebo Family',
    text: 'With our mobile app we make reviewing your benefits and the programs you are enrolled in a snap!',
    image: require('../../assets/intro_images/monster.png'),
  },
];

export default class sliderpage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showRealApp: false,
    };
  }

  renderItem = ({item}) => {
    return (
      <View style={styles.slide}>
        <View style={styles.ellipse}>
          <Image
            source={require('../../assets/intro_images/Ellipse.png')}
            style={styles.ellipse_image}
            resizeMode="contain"
          />
          <Image
            source={item.image}
            style={item.key === 'four' ? styles.monsterimage : styles.image}
            // resizeMode="contain"
          />
        </View>

        {item.key === 'one' ? (
          <Image
            source={require('../../assets/splashscreen_images/car.png')}
            style={styles.car_image}
          />
        ) : null}
        {item.key === 'two' ? (
          <Image
            source={require('../../assets/splashscreen_images/car.png')}
            style={styles.car_image_walk}
            resizeMode="contain"
          />
        ) : null}
        {item.key === 'four' ? (
          <Image
            source={require('../../assets/splashscreen_images/car.png')}
            style={styles.car_image_monster}
            resizeMode="contain"
          />
        ) : null}
        <View style={{width: '90%', marginTop: 275}}>
          <Text style={styles.title}>{item.title}</Text>
          <View style={{marginTop: 10}}>
            <Text style={styles.text}>{item.text}</Text>
          </View>
        </View>
      </View>
    );
  };

  onDone = () => {
    return (
      <LinearGradient
        colors={['#7200FD', '#3B0186']}
        style={styles.buttonCircle}>
        <Icon name="right" color="#FFFFFF" size={20} />
      </LinearGradient>
    );
  };

  renderNextButton = () => {
    return (
      <LinearGradient
        colors={['#7200FD', '#3B0186']}
        style={styles.buttonCircle}>
        <Icon name="right" color="#FFFFFF" size={20} />
      </LinearGradient>
    );
  };

  renderSkipButton = () => {
    return (
      <View style={styles.skipbut}>
        <Text style={styles.skip}>Skip</Text>
        <Icon name="arrowright" color="#5D5D5D" size={20} />
      </View>
    );
  };

  render() {
    return (
      <View style={{flex: 1}}>
        <StatusBar translucent backgroundColor="transparent" />
        <AppIntroSlider
          showSkipButton
          renderSkipButton={this.renderSkipButton}
          data={slides}
          renderItem={item => this.renderItem(item)}
          renderDoneButton={() => this.onDone()}
          renderNextButton={this.renderNextButton}
          onDone={() => this.props.navigation.navigate('Welcome')}
          onSkip={() => this.props.navigation.navigate('Welcome')}
          activeDotStyle={{backgroundColor: '#05B8C6'}}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  ellipse: {
    position: 'absolute',
    right: 0,
    top: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ellipse_image: {
    width: windowWidth / 1.75,
    height: windowHeight / 1.6,
    resizeMode: 'contain',
    // borderWidth: 2,
  },
  car_image: {
    width: windowWidth * 0.7,
    height: windowHeight * 0.65,
    position: 'absolute',
    resizeMode: 'contain',
    left: -40,
    top: 80,
  },
  car_image_monster: {
    width: windowWidth * 0.8,
    height: windowHeight * 0.75,
    position: 'absolute',
    resizeMode: 'contain',
    left: 0,
  },
  car_image_walk: {
    width: windowWidth * 0.7,
    height: windowHeight * 0.65,
    position: 'absolute',
    resizeMode: 'contain',
    left: 0,
  },
  slide: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: '#E5E5E5',
  },
  image: {
    // borderWidth: 1,
    // height: 280,
    // width: 300,
    resizeMode: 'contain',
    width: windowWidth * 0.75,
    height: windowHeight * 0.4,
    position: 'absolute',
    right: 0,
    bottom: 25,
  },
  monsterimage: {
    width: windowWidth * 0.4,
    height: windowHeight * 0.3,
    position: 'absolute',
    left: 70,
    bottom: 45,
    // marginLeft: 225,
    // marginVertical: 130,
  },
  text: {
    fontSize: 16,
    lineHeight: 26,
    color: '#98A6AE',
    textAlign: 'center',
    fontWeight: '400',
    fontFamily: 'Poppins-Regular',
  },
  title: {
    fontSize: 26,
    lineHeight: 40,
    color: '#264653',
    textAlign: 'center',
    fontWeight: '700',
    fontFamily: 'Poppins-Regular',
  },
  buttonCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  skipbut: {
    flexDirection: 'row',
    top: 20,
    left: 10,
  },
  skip: {
    fontSize: 18,
    lineHeight: 20,
    color: '#5D5D5D',
    textAlign: 'center',
    fontWeight: '400',
    fontFamily: 'Poppins-Regular',
  },
});
