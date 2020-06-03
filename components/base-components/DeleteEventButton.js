import React from "react";
import PropTypes from 'prop-types';
import { Alert, Button } from "react-native";

export default DeleteEventButton = (props) => {
  return (
    <Button
      onPress={() =>
        Alert.alert(
          "Delete Event: ",
          `${props.title}`,
          [
            {
              text: "Cancel",
              onPress: () => console.log("Cancel Pressed"),
              style: "cancel",
            },
            {
              text: "Delete",
              onPress: () => props.onDelete(),
            },
          ],
          { cancelable: false }
        )
      }
      title="Delete Event"
      color="#70AB33"
    />
  );
};
DeleteEventButton.propTypes = {
  onDelete: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired
}