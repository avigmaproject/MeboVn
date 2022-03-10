import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

import Icon from 'react-native-vector-icons/AntDesign';

const Header = ({text, onPress, ...props}) => {
  return (
    <View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        marginTop: 20,
      }}>
      <TouchableOpacity
        style={{position: 'absolute', left: 20}}
        onPress={onPress}>
        <Icon name="arrowleft" color="#34353E" size={30} />
      </TouchableOpacity>
      <View style={{}}>
        <Text style={styles.text}>{text}</Text>
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  text: {
    color: '#2F4955',
    fontSize: 20,
    lineHeight: 30,
    fontWeight: '700',
    fontFamily: 'Poppins-Regular',
  },
});
