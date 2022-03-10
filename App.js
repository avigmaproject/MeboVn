import React from 'react';
import {View, Text} from 'react-native';
import MainPage from './src/modules/main/MainPage';

import {
  AuthNavigation,
  StackNavigationEnroller,
  StackNavigationMember,
} from './src/navigation/Mainsatck';
import store, {persistor} from './src/store';

import {Provider, useSelector} from 'react-redux';
import {PersistGate} from 'redux-persist/lib/integration/react';
import {NavigationContainer} from '@react-navigation/native';
import {NativeBaseProvider} from 'native-base';

function App() {
  const user = useSelector(state => state.authReducer.token);
  const userType = useSelector(state => state.authReducer.usertype);

  return (
    <NativeBaseProvider>
      <NavigationContainer>
        {user ? (
          userType === true ? (
            <StackNavigationMember />
          ) : (
            <StackNavigationEnroller />
          )
        ) : (
          <AuthNavigation />
        )}
      </NavigationContainer>
    </NativeBaseProvider>
  );
}
const AppWrapper = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  );
};

export default AppWrapper;
