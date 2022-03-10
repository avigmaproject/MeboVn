import React from 'react';

import SplashScreen1 from '../modules/splashscreen/SplashScreen1';
import sliderpage from '../modules/sliderpage/sliderpage';
import SignIn from '../../src/modules/auth/screens/SignIn';
import ForgetPassword from '../../src/modules/auth/screens/ForgetPassword';
import ResetPassword from '../../src/modules/auth/screens/ResetPassword';
import SuccessPage from '../../src/modules/auth/screens/SuccessPage';
import Member_Register from '../../src/modules/auth/screens/Member_Register';
import Enroller_Register from '../../src/modules/auth/screens/Enroller_Register';
import Welcome from '../../src/modules/welcome/Welcome';
import Homepage from '../modules/memo_home/screens/Homepage';
import Medical_Detail from '../modules/memo_home/screens/Medical_Detail';
import MemberProfile from '../modules/profile/screens/MemberProfile';
import EditMemberProfile from '../modules/profile/screens/EditMemberProfile';

import Enrollerpage from '../modules/enroller_home/screens/Enrollerpage';
import EnrollerProfile from '../modules/profile/screens/EnrollerProfile';
import EditEnrollerProfile from '../modules/profile/screens/EditEnrollerProfile';

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
      <AuthStack.Screen name="sliderpage" component={sliderpage} />
      <AuthStack.Screen name="Welcome" component={Welcome} />
      <AuthStack.Screen name="SignIn" component={SignIn} />
      <AuthStack.Screen name="ForgetPassword" component={ForgetPassword} />
      <AuthStack.Screen name="ResetPassword" component={ResetPassword} />
      <AuthStack.Screen name="SuccessPage" component={SuccessPage} />
      <AuthStack.Screen name="Member_Register" component={Member_Register} />
      <AuthStack.Screen
        name="Enroller_Register"
        component={Enroller_Register}
      />
    </AuthStack.Navigator>
  );
};

export const StackNavigationEnroller = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="EnrollerProfile" component={EnrollerProfile} />
      <Stack.Screen
        name="EditEnrollerProfile"
        component={EditEnrollerProfile}
      />
    </Stack.Navigator>
  );
};

export const StackNavigationMember = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Homepage" component={Homepage} />
      <Stack.Screen name="Medical_Detail" component={Medical_Detail} />
      <Stack.Screen name="MemberProfile" component={MemberProfile} />
      <Stack.Screen name="EditMemberProfile" component={EditMemberProfile} />
    </Stack.Navigator>
  );
};
