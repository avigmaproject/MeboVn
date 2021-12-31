import React, {Component} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Button,
} from 'react-native';

import Gradiant_Button from '../../../components/Gradiant_Button';
import {signout, userId} from '../../../store/action/auth/action';

import {connect} from 'react-redux';

class Homepage extends Component {
  Logout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [{text: 'LOGOUT', onPress: () => this.logoutUser()}, {text: 'CANCEL'}],
      {cancelable: false},
    );
  };
  logoutUser = async () => {
    this.props.signout();

    // await AsyncStorage.removeItem('token');
  };

  render() {
    return (
      <SafeAreaView style={{flex: 1}}>
        <View
          style={{
            height: 80,
            backgroundColor: '#264653',
            borderWidth: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text style={{fontSize: 25, color: '#ffffff'}}>Home</Text>
        </View>
        <View style={{alignItems: 'center', justifyContent: 'center', flex: 3}}>
          <Button title="logout" onPress={() => this.Logout()} />
        </View>
      </SafeAreaView>
    );
  }
}

const mapDispatchToProps = {
  signout,
  userId,
};
const mapStateToProps = (state, ownProps) => ({
  // contacts: state.contactReducer.contacts,
  // parentid: state.parentidReducer.parentid,
});
export default connect(mapStateToProps, mapDispatchToProps)(Homepage);
