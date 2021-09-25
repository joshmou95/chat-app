
import PropTypes from 'prop-types';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Animated } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import MapView from 'react-native-maps';
import { Audio } from 'expo-av';
import { Camera } from 'expo-camera';
import firebase from 'firebase';
import { firestore } from 'firebase';

export default class CustomActions extends React.Component {

  imagePicker = async () => {
    // expo permission
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    try { 
      if(status === 'granted') {
        // pick an image
        const result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
        }).catch((error) => console.log(error));
        // cancelled process
        if (!result.cancelled) {
          const imageUrl = await this.uploadImageFetch(result.uri);
          this.props.onSend({ image: imageUrl });
          // this.setState({
          //   image: result
          // });
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  takePhoto = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      await Camera.requestPermissionsAsync();
    try {
      if(status === 'granted') {
        let result = await ImagePicker.launchCameraAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
        }).catch(error => console.log(error));

        if (!result.cancelled) {
          const imageUrl = await this.uploadImageFetch(result.uri);
          this.props.onSend({ image: imageUrl });
          // this.setState({
          //   image: result
          // });
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  getLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if(status === 'granted') {
        let result = await Location.getCurrentPositionAsync(
          {}
        ).catch((error) => console.log(error));
        const longitude = JSON.stringify(result.coords.longitude);
        const latitude = JSON.stringify(result.coords.latitude)
        if (result) {
          this.props.onSend({
            location: {
              longitude: result.coords.longitude,
              latitude: result.coords.latitude,
            },
          });
          // this.setState({
          //   location: result
          // });
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  uploadImageFetch = async (uri) => {
    const blob = await new Promise((resolve, reject) => {
      // retrieve data from URL
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function (e) {
        console.log(e);
        reject(new TypeError("Network request failed"));
      };
      xhr.responseType = "blob";
      // retrieve the URL data via GET
      xhr.open("GET", uri, true);
      xhr.send(null);
    });

    const imageNameBefore = uri.split("/");
    const imageName = imageNameBefore[imageNameBefore.length -1];

    // create reference to a child of storage
    const ref = firebase.storage().ref().child(`images/${imageName}`);
    // upload data to reference location
    const snapshot = await ref.put(blob);
    // close the connection
    blob.close();

    // get image URL from storage
    return await snapshot.ref.getDownloadURL();
  };



  onActionPress = () => {
      const options = [
          'Choose From Library',
          'Take Picture',
          'Send Location',
          'Cancel'];
      const cancelButtonIndex = options.length - 1;
      // pass data through component tree with context
      this.context.actionSheet().showActionSheetWithOptions(
        {
          options,
          cancelButtonIndex,
        },
        async (buttonIndex) => {
          switch (buttonIndex) {
            case 0:
              console.log('user wants to pick an image');
              return this.imagePicker();
            case 1:
              console.log('user wants to take a photo');
              return this.takePhoto();
            case 2:
              console.log('user wants to get their location');
              return this.getLocation();
            default:
          }
        },
      );
    };

  render() {
      return (
        <TouchableOpacity
        accessible={true}
        accessibilityLabel="More options"
        accessibilityHint="Let’s you choose to send an image or your geolocation."
        style={[styles.container]}
        onPress={this.onActionPress}>
          <View style={[styles.wrapper, this.props.wrapperStyle]}>
            <Text style={[styles.iconText, this.props.iconTextStyle]}>+</Text>
          </View>
        </TouchableOpacity>
      );
    }

}

const styles = StyleSheet.create({
  container: {
    width: 26,
    height: 26,
    marginLeft: 10,
    marginBottom: 10,
  },
  wrapper: {
    borderRadius: 13,
    borderColor: '#b2b2b2',
    borderWidth: 2,
    flex: 1,
  },
  iconText: {
    color: '#b2b2b2',
    fontWeight: 'bold',
    fontSize: 16,
    backgroundColor: 'transparent',
    textAlign: 'center',
  },
});

CustomActions.contextTypes = {
  actionSheet: PropTypes.func,
};
