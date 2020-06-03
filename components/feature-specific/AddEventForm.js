import React from "react";
import {
  Button,
  TextInput,
  KeyboardAvoidingView,
  StyleSheet,
  View,
  Text,
  ScrollView,
  Image,
} from "react-native";
import PropTypes from 'prop-types';

// Components
import DateTimePickerComponent from "../shared-components/DateTimePickerComponent";
import { dateToString } from "../shared-components/FormatDates";
import ImagePickerComponent from "../shared-components/ImagePickerComponent";

// Styles
import {
  IMAGE_BACKGROUND_COLOR,
  containerBackground,
} from "../../styles/sharedStyles";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  input: {
    borderWidth: 1,
    borderColor: "black",
    minWidth: 100,
    marginTop: 20,
    marginHorizontal: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 3,
  },
  dateTime: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
  },
  maybeRenderUploading: {
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
  },
  image: {
    alignItems: "center",
    width: "95%",
    margin: 1,
    resizeMode: "contain",
    backgroundColor: IMAGE_BACKGROUND_COLOR,
    height: 250,
  },
  imageContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default class AddEventForm extends React.Component {
  state = {
    title: "",
    description: "",
    place: "",
    date: new Date(),
    isFormValid: false,
    image: null,
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      this.state.title !== prevState.title ||
      this.state.description !== prevState.description ||
      this.state.place !== prevState.place ||
      this.state.image !== prevState.image ||
      this.state.date !== prevState.date
    ) {
      this.validateForm();
    }
  }

  validateForm = () => {
    const now = new Date().toISOString();
    const { title, description, place, date } = this.state;
    if (
      title.length >= 1 &&
      description.length >= 1 &&
      place.length >= 1 &&
      date > now
    ) {
      this.setState({ isFormValid: true });
    } else {
      this.setState({ isFormValid: false });
    }
  };

  handleEventImageChange = (image) => {
    this.setState({ image: image.uri });
  };

  handleTitleChange = (title) => {
    this.setState({ title });
  };

  handleDescriptionChange = (description) => {
    this.setState({ description });
  };
  handlePlaceChange = (place) => {
    this.setState({ place });
  };

  handleSubmit = () => {
    this.props.onSubmit(this.state);
  };

  handleDateTimeChange = (date) => {
    const isoDate = date.toISOString();
    this.setState({date: isoDate});
  };

  render() {
    let { title, description, place, date, image, isFormValid } = this.state;

    return (
      <KeyboardAvoidingView
        behavior="padding"
        enabled
        keyboardVerticalOffset={100}
        style={[styles.container, containerBackground]}
      >
        <ScrollView>
          <TextInput
            onChangeText={this.handleTitleChange}
            value={title}
            placeholder="Title of the Event.."
            style={styles.input}
          />
          <TextInput
            onChangeText={this.handleDescriptionChange}
            value={description}
            placeholder="Please describe the event."
            style={styles.input}
            multiline={true}
          />
          <TextInput
            onChangeText={this.handlePlaceChange}
            value={place}
            placeholder="Place"
            style={styles.input}
          />
          <View style={styles.dateTime}>
          <Text>{dateToString(date)}</Text>
          </View>
          <DateTimePickerComponent handleDateTime={this.handleDateTimeChange} />
          <ImagePickerComponent
            handleEventImageChange={this.handleEventImageChange}
          />
          {image ? (
            <View style={styles.imageContainer}>
              <Image source={{ uri: image }} style={styles.image} />
            </View>
          ) : (
            <Image
              source={require("../../assets/image-not-available.png")}
              style={styles.image}
            />
          )}

          <Button
            onPress={this.handleSubmit}
            title="Submit"
            disabled={!isFormValid}
            color="#70AB33"
          />
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}

AddEventForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};