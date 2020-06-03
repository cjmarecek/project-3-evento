import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableHighlight,
} from "react-native";
import PropTypes from "prop-types";
import { dateToString } from "../shared-components/FormatDates";
import { API_URL } from "react-native-dotenv";
import { IMAGE_BACKGROUND_COLOR } from "../../styles/sharedStyles";

const styles = StyleSheet.create({
  eventContainer: {
    backgroundColor: "white",
    borderRadius: 5,
    elevation: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    margin: 5,
    padding: 5,
    height: 137,
    justifyContent: "space-between",
  },
  headerContainer: {
    margin: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    height: "50%",
  },
  header: {
    margin: 1,
    flex: 2,
    justifyContent: "center",
  },
  header2: {
    margin: 1,
    fontSize: 22,
    fontWeight: "500",
  },
  dateTime: {
    margin: 1,
    fontSize: 10,
  },
  headerImage: {
    margin: 1,
    flex: 1,
    height: "auto",
    resizeMode: "contain",
    backgroundColor: IMAGE_BACKGROUND_COLOR,
  },
  headerImageEmpty: {
    margin: 1,
    flex: 1,
    height: "auto",
    resizeMode: "contain",
    backgroundColor: IMAGE_BACKGROUND_COLOR,
  },
  shortDescription: {
    margin: 1,
    height: "42%",
  },
  text: {},
});

export default Event = (props) => {
  let imageURL = API_URL + "/api/events/uploads/" + props.image;
  return (
    <TouchableHighlight
      onPress={() => props.onSelectEvent(props)}
      underlayColor={"rgba(0,0,0,0.2)"}
      activeOpacity={0.9}
    >
      <View style={styles.eventContainer}>
        <View style={styles.headerContainer}>
          <View style={styles.header}>
            <Text style={styles.header2} ellipsizeMode="tail" numberOfLines={2}>
              {props.title}
            </Text>
            <Text style={styles.dateTime}>{dateToString(props.date)}</Text>
          </View>

          {props.image ? (
            <Image source={{ uri: imageURL }} style={styles.headerImage} />
          ) : (
            <Image
              source={require("../../assets/image-not-available.png")}
              style={styles.headerImageEmpty}
            />
          )}
        </View>
        <View style={styles.shortDescription}>
          <Text style={styles.text} ellipsizeMode="tail" numberOfLines={3}>
            {props.description}
          </Text>
        </View>
      </View>
    </TouchableHighlight>
  );
};

Event.propTypes = {
  onSelectEvent: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  description: PropTypes.string,
  image: PropTypes.string,
};
