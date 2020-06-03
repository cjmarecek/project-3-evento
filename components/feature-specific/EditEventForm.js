import React from "react";
import {
  Button,
  TextInput,
  KeyboardAvoidingView,
  StyleSheet,
  View,
  Text,
  ScrollView,
  Alert,
  Image,
} from "react-native";
import PropTypes from "prop-types";

import DateTimePickerComponent from "../shared-components/DateTimePickerComponent";
import { dateToString } from "../shared-components/FormatDates";
import {
  IMAGE_BACKGROUND_COLOR,
  containerBackground,
} from "../../styles/sharedStyles";
import { API_URL } from "react-native-dotenv";
import ImagePickerComponent from "../shared-components/ImagePickerComponent";

const styles = StyleSheet.create({
  container: {
    // flex: 1
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
  image: {
    alignItems: "center",
    width: "95%",
    margin: 1,
    // borderWidth: 1,
    resizeMode: "contain",
    backgroundColor: IMAGE_BACKGROUND_COLOR,
    height: 250,
  },
  imageContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 20,
    marginHorizontal: 5,
  },
});

export default class EditEventForm extends React.Component {
  state = {
    title: "",
    description: "",
    place: "",
    date: new Date(),
    isFormValid: true,
    image: null,
    imageURL: null,
  };

  componentDidMount() {
    const { title, description, place, date, image } = this.props;
    image
      ? this.setState({ imageURL: API_URL + "/api/events/uploads/" + image })
      : null;
    this.setState({
      title,
      description,
      place,
      date,
      image,
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      this.state.title !== prevState.title ||
      this.state.description !== prevState.description
    ) {
      this.validateForm();
    }
  }

  validateForm = () => {
    if (
      this.state.title.length >= 1 &&
      this.state.description.length >= 1 &&
      this.state.place.length >= 1
    ) {
      this.setState({ isFormValid: true });
    } else {
      this.setState({ isFormValid: false });
    }
  };
  handleEventImageChange = (image) => {
    this.setState({ image: image.uri, imageURL: image.uri });
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
    const now = new Date().toISOString();
    this.setState(
      {
        date: isoDate,
      },
      () => {
        if (isoDate > now) {
          this.setState({ isFormValid: true });
        } else {
          this.setState({ isFormValid: false });
        }
      }
    );
  };

  render() {
    let { title, description, place, date, image, imageURL, isFormValid } = this.state;

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
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              margin: 10,
            }}
          >
            <Text>{dateToString(date)}</Text>
          </View>
          <DateTimePickerComponent
            date={date}
            handleDateTime={this.handleDateTimeChange}
          />
          <ImagePickerComponent
            handleEventImageChange={this.handleEventImageChange}
          />
          {image ? (
            <View style={styles.imageContainer}>
              <Image source={{ uri: imageURL }} style={styles.image} />
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
          <View style={{ height: 20 }}></View>

          <Button
            onPress={() =>
              Alert.alert(
                "Delete Event: ",
                `${title}`,
                [
                  {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel",
                  },
                  {
                    text: "Delete",
                    onPress: () => this.props.onDelete(),
                  },
                ],
                { cancelable: false }
              )
            }
            title="Delete Event"
            color="#70AB33"
          />
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}

EditEventForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  place: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  image: PropTypes.string,
};
