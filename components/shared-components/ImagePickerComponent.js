import React, { Component } from 'react';
import { Button, StatusBar, StyleSheet, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';

export default class ImagePickerComponent extends Component {
  render() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="default" />
        <Button
          onPress={this._pickImage}
          title="Pick an image from camera roll"
          color='#70AB33'
        />
        <Button onPress={this._takePhoto} title="Take a photo"           
        color='#70AB33'/>
      </View>
    );
  }

  _takePhoto = async () => {
    const { status: cameraPerm } = await Permissions.askAsync(
      Permissions.CAMERA,
    );

    const { status: cameraRollPerm } = await Permissions.askAsync(
      Permissions.CAMERA_ROLL,
    );

    // only if user allows permission to camera AND camera roll
    if (cameraPerm === 'granted' && cameraRollPerm === 'granted') {
      let pickerResult = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.5,
      });
      this._handleImagePicked(pickerResult);
    }
  };

  _pickImage = async () => {
    const { status: cameraRollPerm } = await Permissions.askAsync(
      Permissions.CAMERA_ROLL,
    );

    // only if user allows permission to camera roll
    if (cameraRollPerm === 'granted') {
      let pickerResult = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.5,
      });

      this._handleImagePicked(pickerResult);
    }
  };

  _handleImagePicked = (pickerResult) => {
    if (!pickerResult.cancelled) {
      this.props.handleEventImageChange(pickerResult);
    }
  };
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
});
