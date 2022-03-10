import * as React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const Gradiant_Button = ({text, ...props}) => {
  return (
    <TouchableOpacity onPress={props.onPress}>
      <LinearGradient
        colors={['#7200FD', '#3B0186']}
        style={{
          width: '90%',
          alignSelf: 'center',
          height: 65,
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 8,
        }}>
        <Text
          style={{
            color: '#FFFFFF',
            fontWeight: '600',
            fontSize: 18,
            lineHeight: 27,
            fontFamily: 'Poppins-Regular',
          }}>
          {text}
        </Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default Gradiant_Button;
