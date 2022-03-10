import React, {Component} from 'react';
import {View, Text, StyleSheet, Dimensions, Image} from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const Header = () => {
  return (
    <View style={{alignItems: 'center', justifyContent: 'center'}}>
      <Image
        source={require('../assets/welcome_image/Rectangle.png')}
        style={styles.header}
      />
      <Image
        source={require('../assets/splashscreen_images/logo.png')}
        style={styles.monster}
        resizeMode="contain"
      />
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  header: {
    width: windowWidth,
    height: windowHeight / 8,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
  },
  monster: {
    position: 'absolute',
    height: windowHeight / 8,
    width: windowWidth / 2,
  },
});
