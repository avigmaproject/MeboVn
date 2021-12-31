import * as React from 'react';
import {Button as PaperButton} from 'react-native-paper';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import MaskedView from '@react-native-community/masked-view';

const Icon_Button = ({text, image, ...props}) => {
  return (
    <TouchableOpacity
      style={{
        width: '90%',
        alignSelf: 'center',
        height: 65,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FFFFFF',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#8F8F8F',
        flexDirection: 'row',
      }}
      onPress={props.onPress}>
      <Image source={image} style={{marginRight: 25}} />
      <Text
        style={{
          fontSize: 17,
          lineHeight: 25.5,
          fontWeight: '500',
          color: '#98A6AE',
        }}>
        {text}
      </Text>
    </TouchableOpacity>
  );
};

export default Icon_Button;
