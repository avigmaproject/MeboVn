import React, {Component} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Image,
} from 'react-native';

const Header = ({onPress, image, ...props}) => {
  return (
    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
      <Image
        source={require('../../../assets/splashscreen_images/logo.png')}
        style={styles.monster}
      />
      <TouchableOpacity onPress={onPress}>
        <Image source={image} style={styles.profile} />
      </TouchableOpacity>
    </View>
  );
};
export default Header;

const styles = StyleSheet.create({
  monster: {
    left: 20,
    height: 53,
    width: 160,
  },
  profile: {
    height: 45,
    width: 45,
    borderRadius: 22.5,
    right: 20,
    top: 5,
  },
});
