import React, {Component} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Dimensions,
  Image,
  Platform,
} from 'react-native';

import Gradiant_Button from '../../../components/Gradiant_Button';
import GradientText from '../../../components/GradientText';
import {signout, userId} from '../../../store/action/auth/action';
import Header from '../components/Header';
import Button from '../components/Button';

import {connect} from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RNFetchBlob from 'rn-fetch-blob';
import {Overlay, Icon, Button as Photo_Button} from 'react-native-elements';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

class Medical_Detail extends Component {
  constructor() {
    super();
    this.state = {
      show_Image: false,
    };
  }

  // actualDownload = () => {
  //   const {route} = this.props;
  //   const {dirs} = RNFetchBlob.fs;
  //   const dirToSave =
  //     Platform.OS == 'ios' ? dirs.DocumentDir : dirs.DownloadDir;
  //   const configfb = {
  //     fileCache: true,
  //     useDownloadManager: true,
  //     notification: true,
  //     mediaScannable: true,
  //     path: `${dirToSave}/${route.params.item.Pro_PdfPath}.pdf`,
  //   };
  //   const configOptions = Platform.select({
  //     ios: {
  //       fileCache: configfb.fileCache,
  //       path: configfb.path,
  //     },
  //     android: configfb,
  //   });

  //   RNFetchBlob.config(configOptions)
  //     .fetch('GET', route.params.item.Pro_PdfPath, {})
  //     .then(res => {
  //       if (Platform.OS === 'ios') {
  //         RNFetchBlob.ios.openDocument(res.data);
  //       }

  //       if (Platform.OS == 'android') {
  //         this.showMessage('File downloaded');
  //       }
  //       console.log('The file saved to ', res);
  //     })
  //     .catch(e => {
  //       console.log('The file saved to ERROR', e.message);
  //     });
  // };

  actualDownload = () => {
    const {FilePath, excel} = this.state;
    const {route} = this.props;
    const {dirs} = RNFetchBlob.fs;

    if (Platform.OS === 'android') {
      RNFetchBlob.config({
        fileCache: true,
        addAndroidDownloads: {
          useDownloadManager: true,
          notification: true,

          path: excel
            ? `${dirs.DownloadDir}/test.xls`
            : `${dirs.DownloadDir}/test.pdf`,
          description: 'Downloading..',
        },
      })
        .fetch('GET', route.params.item.Pro_PdfPath, {})
        .then(res => {
          console.log('The file saved to ', res.data);
          this.showMessage('File downloaded');
        })
        .catch(e => {
          console.log(e);
        });
    } else {
      const configfb = {
        fileCache: true,
        useDownloadManager: true,
        notification: true,
        mediaScannable: true,
        path: excel
          ? `${dirs.DocumentDir}/${route.params.item.Pro_PdfPath}.xls`
          : `${dirs.DocumentDir}/${route.params.item.Pro_PdfPath}.pdf`,
      };
      const configOptions = Platform.select({
        ios: {
          fileCache: configfb.fileCache,
          // title: configfb.title,
          path: configfb.path,
          // appendExt: excel ? 'xls' : 'pdf',
        },
      });
      RNFetchBlob.config(configOptions)
        .fetch('GET', route.params.item.Pro_PdfPath, {})
        .then(res => {
          RNFetchBlob.ios.openDocument(res.data);
        })
        .catch(e => {
          console.log('The file saved to ERROR', e.message);
        });
    }
  };

  toggleOverlay = () => {
    this.setState({show_Image: !this.state.show_Image});
  };

  render() {
    const {route, navigation} = this.props;
    const {show_Image} = this.state;
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: '#FAFAFA'}}>
        <Header onPress={() => navigation.navigate('MemberProfile')} />
        <View style={styles.name}>
          <Text style={styles.text}>Name : {route.params.name}</Text>
        </View>
        <View
          style={{
            padding: 25,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <View>
            <Text style={styles.text}>Monthly Premium</Text>
            <GradientText style={styles.dollar}>
              $ {route.params.item.UP_Amount}
            </GradientText>
          </View>
          <TouchableOpacity>
            <LinearGradient
              colors={['#7200FD', '#3B0186']}
              style={styles.button}>
              <Text style={styles.changebutton}>Change Method</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
        <View style={styles.card}>
          <View style={{flexDirection: 'row'}}>
            <Image
              source={{uri: route.params.item.Pro_ImagePath}}
              style={styles.image}
            />
            <View style={{padding: 10, width: '70%'}}>
              <Text style={styles.title}>{route.params.item.Pro_Name}</Text>
              {route.params.item.Status_Enroll === 0 ? (
                <Text style={styles.plan}>Not Enrolled</Text>
              ) : (
                <View style={{flexDirection: 'row'}}>
                  <Image
                    source={require('../assets/Gold.png')}
                    style={{top: 3}}
                  />
                  <Text style={styles.plan}>Gold Pro Plan</Text>
                </View>
              )}
            </View>
            <View style={{right: 0, position: 'absolute', alignSelf: 'center'}}>
              <GradientText style={styles.dollar}>
                $ {route.params.item.UP_Amount}
              </GradientText>
            </View>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            padding: 20,
            justifyContent: 'space-between',
            marginTop: 10,
          }}>
          <Button text="Summary PDF" onPress={() => this.actualDownload()} />
          <Button
            text="Digital ID Card"
            onPress={() => this.setState({show_Image: true})}
          />
          <Overlay
            isVisible={show_Image}
            onBackdropPress={() => this.toggleOverlay()}>
            <Image
              source={{uri: route.params.item.Pro_ImagePath}}
              style={{width: windowWidth / 1.2, height: windowHeight / 2.5}}
            />
            <Photo_Button
              // icon={
              //   <Icon
              //     name="cancel"
              //     type="MaterialIcons"
              //     color="black"
              //     size={25}
              //     iconStyle={{marginRight: 10}}
              //   />
              // }
              title="OK"
              onPress={() => this.toggleOverlay()}
            />
          </Overlay>
        </View>
        <View
          style={{
            flexDirection: 'row',
            padding: 20,
            justifyContent: 'space-between',
          }}>
          <Button text="Check Net work" />
          <Button text="Contact for Claims" />
        </View>
        <View
          style={{
            flexDirection: 'row',
            padding: 20,
            justifyContent: 'space-between',
          }}>
          <Button text="Contact Billing" />
          <Button text="Change Coverage" />
        </View>
      </SafeAreaView>
    );
  }
}

export default Medical_Detail;

const styles = StyleSheet.create({
  name: {
    backgroundColor: '#E5E5E5',
    width: '90%',
    // borderWidth: 1,
    height: windowHeight / 10,
    marginTop: 20,
    alignSelf: 'center',
    padding: 25,
  },
  text: {
    color: '#2F4955',
    fontFamily: 'Poppins-Regular',
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 24,
  },
  image: {
    height: 80,
    width: 80,
    borderRadius: 1,
    borderColor: '#BDBDBD',
    borderWidth: 1,
    top: 0,
  },
  button: {
    width: '135%',
    alignSelf: 'center',
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 2,
    right: 20,
    top: 5,
  },
  changebutton: {
    color: '#FAFAFA',
    fontFamily: 'Poppins-Regular',
    fontWeight: '500',
    fontSize: 14,
    lineHeight: 18,
  },
  dollar: {
    // color: '#FAFAFA',
    fontFamily: 'Poppins-Regular',
    fontWeight: '700',
    fontSize: 18,
    lineHeight: 27,
  },
  card: {
    backgroundColor: '#E5E5E5',
    width: '90%',
    // borderWidth: 1,
    height: 100,
    marginTop: 20,
    alignSelf: 'center',
    justifyContent: 'center',
    padding: 10,
    borderRadius: 3,
    shadowColor: 'grey',
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowOffset: {
      height: 2,
      width: 2,
    },
  },
  title: {
    color: '#2F4955',
    fontFamily: 'Poppins-Regular',
    fontWeight: '600',
    fontSize: 18,
    lineHeight: 27,
  },
  plan: {
    color: '#264653',
    fontFamily: 'Poppins-Regular',
    fontWeight: '400',
    fontSize: 12,
    lineHeight: 18,
    left: 5,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});
