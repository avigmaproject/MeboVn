import React, {Component} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
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
    text: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer manying took.",
    image: require('../../assets/intro_images/WalkThrough1.png'),
  },
  {
    key: 'two',
    title: 'Come on inside',
    text: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer manying took.",
    image: require('../../assets/intro_images/WalkThrough2.png'),
  },
  {
    key: 'three',
    title: 'Sign IN',
    text: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer manying took.",
    image: require('../../assets/intro_images/Frame.png'),
  },
  {
    key: 'four',
    title: 'Mobo Family',
    text: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer manying took.",
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
        <Image
          source={item.image}
          style={item.key === 'four' ? styles.monsterimage : styles.image}
          resizeMode="cover"
        />
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
          />
        ) : null}
        {item.key === 'four' ? (
          <Image
            source={require('../../assets/splashscreen_images/car.png')}
            style={styles.car_image_monster}
          />
        ) : null}
        <View style={{}}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.text}>{item.text}</Text>
        </View>
      </View>
    );
  };

  onDone = () => {
    return (
      <LinearGradient
        colors={['#222439', '#5B0BBC']}
        style={styles.buttonCircle}>
        <Icon name="right" color="#FFFFFF" size={20} />
      </LinearGradient>
    );
  };

  renderNextButton = () => {
    return (
      <LinearGradient
        colors={['#222439', '#5B0BBC']}
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
      <SafeAreaView style={styles.background}>
        <AppIntroSlider
          showSkipButton
          renderSkipButton={this.renderSkipButton}
          data={slides}
          renderItem={item => this.renderItem(item)}
          renderDoneButton={() => this.onDone()}
          renderNextButton={this.renderNextButton}
          onDone={() => this.props.navigation.navigate('Welcome')}
          onSkip={() => this.props.navigation.navigate('Welcome')}
        />
        <View style={styles.ellipse}>
          <Image
            source={require('../../assets/intro_images/Ellipse.png')}
            style={styles.ellipse_image}
          />
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  ellipse: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    right: 0,
    top: 35,
  },
  ellipse_image: {
    // borderWidth: 2,
  },
  car_image: {
    height: 150,
    width: 280,
    position: 'absolute',
    left: -60,
  },
  car_image_monster: {
    height: 150,
    width: 280,
    position: 'absolute',
    left: 0,
  },
  car_image_walk: {
    height: 150,
    width: 280,
    position: 'absolute',
    left: 0,
    bottom: 150,
  },
  slide: {
    // flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: '#E5E5E5',
  },
  image: {
    // borderWidth: 1,
    // height: 280,
    // width: 300,
    marginLeft: 50,
    marginVertical: 100,
  },
  monsterimage: {
    height: 235,
    width: 175,
    marginLeft: 225,
    marginVertical: 130,
    // borderWidth: 1,
  },
  text: {
    fontSize: 16,
    lineHeight: 26,
    color: '#98A6AE',
    textAlign: 'center',
    fontWeight: '400',
  },
  title: {
    fontSize: 26,
    lineHeight: 40,
    color: '#264653',
    textAlign: 'center',
    fontWeight: '700',
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
  },
});
