
import PropTypes from 'prop-types';
import React from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import MapView from 'react-native-maps';
import { Audio } from 'expo-av';
import { Camera } from 'expo-camera';

export default class CustomActions extends React.Component {

  imagePicker = async () => {
    // expo permission
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if(status === 'granted') {
      // pick an image
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
      }).catch(error => console.log(error));
      // cancelled process
      if (!result.cancelled) {
        this.setState({
          image: result
        });
      }
    }
  }

  takePhoto = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      await Camera.requestPermissionsAsync();

    if(status === 'granted') {
      let result = await ImagePicker.launchCameraAsync({
        mediaTypes: 'Images',
      }).catch(error => console.log(error));

      if (!result.cancelled) {
        this.setState({
          image: result
        });
      }
    }
  }

  getLocation = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if(status === 'granted') {
      let result = await Location.getCurrentPositionAsync({});

      if (result) {
        this.setState({
          location: result
        });
      }
    }
  }


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
