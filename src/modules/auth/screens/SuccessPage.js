import React from 'react';
import {SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native';

import Gradiant_Button from '../../../components/Gradiant_Button';
import Header from '../../../components/Header';
import Ionicons from 'react-native-vector-icons/Ionicons';

export const SuccessPage = ({navigation}) => {
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#FFFFFF'}}>
      <Header />
      <View style={{alignSelf: 'center', marginTop: 100}}>
        <Text
          style={{
            color: '#000000',
            fontSize: 20,
            textAlign: 'center',
            fontWeight: '800',
            fontFamily: 'Poppins-Regular',
          }}>
          Your password has been changed successfully!!
        </Text>
      </View>
      <View style={{marginTop: 30}}>
        <Gradiant_Button
          text="Click here for login"
          backgroundColor="#6633FF"
          onPress={() => navigation.navigate('SignIn')}
        />
      </View>
    </SafeAreaView>
  );
};
export default SuccessPage;
