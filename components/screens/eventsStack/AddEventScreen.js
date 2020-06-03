import React, { useEffect } from "react";
import { View, StyleSheet, Text } from "react-native";
import PropTypes from "prop-types";

// Redux
import { connect } from "react-redux";
import {
  createEvent,
} from "../../../redux/actions/eventsActions";

// Components
import ActivityIndicator from "../../shared-components/ActivityIndicator";
import AddEventForm from "../../feature-specific/AddEventForm";

const styles = StyleSheet.create({
  maybeRenderUploading: {
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
  },
});

const AddEventScreen = (props) => {
  const handleSubmit = (formState) => {
    props.createEvent(formState);
    props.navigation.navigate("Events");
  };

  if (props.error) {
    return <Text>{props.error}</Text>
  }
  if (props.loading) {
    return <ActivityIndicator />;
  } else {
    return <AddEventForm onSubmit={handleSubmit} />;
  }
};

AddEventScreen.propTypes = {
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string,
  createEvent: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  createEvent: (formState) => dispatch(createEvent(formState)),
});

const mapStateToProps = (state) => ({
  loading: state.events.loading,
  error: state.events.error,
});

export default connect(mapStateToProps, mapDispatchToProps)(AddEventScreen);
