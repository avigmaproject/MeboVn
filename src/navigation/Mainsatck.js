import React from 'react';
import SplashScreen1 from '../modules/splashscreen/SplashScreen1';
import SplashScreen2 from '../modules/splashscreen/SplashScreen2';
import sliderpage from '../modules/sliderpage/sliderpage';
import SignIn from '../../src/modules/auth/screens/SignIn';
import ForgetPassword from '../../src/modules/auth/screens/ForgetPassword';
import ResetPassword from '../../src/modules/auth/screens/ResetPassword';
import Member_Register from '../../src/modules/auth/screens/Member_Register';
import Enroller_Register from '../../src/modules/auth/screens/Enroller_Register';
import Welcome from '../../src/modules/welcome/Welcome';
import Homepage from '../modules/home/screens/Homepage';

import {createStackNavigator} from '@react-navigation/stack';

const AuthStack = createStackNavigator();

const Stack = createStackNavigator();

export const AuthNavigation = () => {
  return (
    <AuthStack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <AuthStack.Screen name="SplashScreen1" component={SplashScreen1} />
      <AuthStack.Screen name="SplashScreen2" component={SplashScreen2} />
      <AuthStack.Screen name="sliderpage" component={sliderpage} />
      <AuthStack.Screen name="Welcome" component={Welcome} />
      <AuthStack.Screen name="SignIn" component={SignIn} />
      <AuthStack.Screen name="ForgetPassword" component={ForgetPassword} />
      <AuthStack.Screen name="ResetPassword" component={ResetPassword} />
      <AuthStack.Screen name="Member_Register" component={Member_Register} />
      <AuthStack.Screen
        name="Enroller_Register"
        component={Enroller_Register}
      />
    </AuthStack.Navigator>
  );
};

export const StackNavigation = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Homepage" component={Homepage} />
    </Stack.Navigator>
  );
};
