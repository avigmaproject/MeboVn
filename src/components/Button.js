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
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import MaskedView from '@react-native-community/masked-view';

const Button = ({text, ...props}) => {
  const GradientText = props => (
    <MaskedView maskElement={<Text {...props} />}>
      <LinearGradient
        colors={['#222439', '#5B0BBC']}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}>
        <Text {...props} style={[props.style, {opacity: 0}]} />
      </LinearGradient>
    </MaskedView>
  );

  return (
    <TouchableOpacity
      style={{
        width: '90%',
        alignSelf: 'center',
        height: 65,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: props.backgroundColor,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#3B0186',
      }}
      onPress={props.onPress}>
      <GradientText style={{fontSize: 18, lineHeight: 27, fontWeight: '600'}}>
        {text}
      </GradientText>
    </TouchableOpacity>
  );
};

export default Button;
