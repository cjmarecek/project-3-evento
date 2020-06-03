import React from "react";
import { Text } from 'react-native';
import PropTypes from "prop-types";

// Redux
import { connect } from "react-redux";
import { updateEvent, eraseEvent } from "../../../redux/actions/eventsActions";

// Components
import EditEventForm from "../../feature-specific/EditEventForm";
import ActivityIndicator from "../../shared-components/ActivityIndicator";

const EditEventScreen = (props) => {
  const handleSubmit = (formState) => {
    props.updateEvent({
      id: props.route.params._id,
      title: formState.title,
      description: formState.description,
      place: formState.place,
      date: formState.date,
      image: formState.image,
    });
    props.navigation.navigate("Events");
  };

  const handleDelete = () => {
    props.eraseEvent(props.route.params._id);
    props.navigation.navigate("Events");
  };
  if (props.error) {
    return <Text>{props.error}</Text>
  }
  if (props.loading) {
    return <ActivityIndicator />;
  }
  return (
    <EditEventForm
      onSubmit={handleSubmit}
      onDelete={handleDelete}
      title={props.route.params.title}
      description={props.route.params.description}
      place={props.route.params.place}
      date={props.route.params.date}
      image={props.route.params.image}
    />
  );
};

EditEventScreen.propTypes = {
  updateEvent: PropTypes.func.isRequired,
  eraseEvent: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string,
};

const mapStateToProps = (state) => ({
  loading: state.events.loading,
  error: state.events.error,
});

const mapDispatchToProps = (dispatch) => ({
  updateEvent: (event) => dispatch(updateEvent(event)),
  eraseEvent: (id) => dispatch(eraseEvent(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditEventScreen);
