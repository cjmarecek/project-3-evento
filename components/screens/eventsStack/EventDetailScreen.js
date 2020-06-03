import React from "react";
import { View, Text, StyleSheet, Image, ScrollView } from "react-native";
import PropTypes from 'prop-types';
import { API_URL } from "react-native-dotenv";

import {
  dateToTimeString,
  dateToDateString,
} from "../../shared-components/FormatDates";

import {
  WINDOW_WIDTH,
  IMAGE_BACKGROUND_COLOR,
} from "../../../styles/sharedStyles";

const styles = StyleSheet.create({
  eventContainer: {
    margin: 5,
    width: WINDOW_WIDTH - 20,
    paddingHorizontal: 10,
    justifyContent: "flex-start",
    alignItems: "center",
    borderRadius: 5,
    paddingBottom: 20,
    marginBottom: 30,
  },
  headerContainer: {
    height: "auto",
    width: "100%",
    margin: 5,
  },
  heading1: {
    fontSize: 26,
    lineHeight: 28,
    justifyContent: "flex-start",
    alignItems: "center",
    fontWeight: "bold",
  },
  imageContainer: {
    width: "100%",
    margin: 1,
    alignItems: "center",
  },
  image: {
    alignItems: "center",
    width: "100%",
    margin: 1,
    resizeMode: "contain",
    backgroundColor: IMAGE_BACKGROUND_COLOR,
    height: 250,
  },
  dateTime: {
    margin: 1,
    fontSize: 18,
    alignSelf: "flex-start",
  },
  place: {
    margin: 1,
    fontSize: 24,
    fontWeight: "400",
    alignSelf: "flex-start",
  },
  dates: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  description: {
    margin: 1,
    marginTop: 10,
  },
});

export default EventDetailScreen = ({ route, navigation }) => {
  const { title, description, place, date, image } = route.params;
  let imageURL = API_URL + "/api/events/uploads/" + image;

  return (
    <ScrollView
      scrollToOverflowEnabled={false}
      contentContainerStyle={styles.eventContainer}
    >
      <View style={styles.headerContainer}>
        <Text style={styles.heading1}>{title}</Text>
      </View>
      <View style={styles.imageContainer}>
        {image ? (
          <Image source={{ uri: imageURL }} style={styles.image} />
        ) : (
          <Image
            source={require("../../../assets/image-not-available.png")}
            style={styles.image}
          />
        )}
      </View>
      <Text style={styles.place}>{place}</Text>
      <View style={styles.dates}>
        <Text style={styles.dateTime}>
          {dateToTimeString(date)}
        </Text>
        <Text style={styles.dateTime}>
          {dateToDateString(date)}
        </Text>
      </View>
      {description ? (
        <Text style={styles.description}>{description}</Text>
      ) : null}
    </ScrollView>
  );
};

EventDetailScreen.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.shape({
      title: PropTypes.string.isRequired,
      description: PropTypes.string,
      place: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
      image: PropTypes.string,
      _id: PropTypes.string.isRequired
    })
  })
}