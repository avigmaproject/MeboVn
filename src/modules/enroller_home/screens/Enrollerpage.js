import React, {Component} from 'react';
import {Text, View, Alert, Button, SafeAreaView} from 'react-native';

import {signout, userId} from '../../../store/action/auth/action';
import Header from '../components/Header';

import {connect} from 'react-redux';

class Enrollerpage extends Component {
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
  };
  render() {
    const {navigation} = this.props;
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: '#FFFFFF'}}>
        <Header onPress={() => navigation.navigate('EnrollerProfile')} />
        <View style={{marginTop: 50}}>
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
export default connect(mapStateToProps, mapDispatchToProps)(Enrollerpage);
