import React from "react";
import { Text } from "react-native";
import PropTypes from "prop-types";

// Redux
import { connect } from "react-redux";
import { updateEvent, eraseEvent } from "../../../redux/actions/eventsActions";

// Components
import EditEventForm from "../../feature-specific/EditEventForm";
import ActivityIndicator from "../../shared-components/ActivityIndicator";

const EditEventScreen = (props) => {
  const handleSubmit = (formState) => {
    const { title, description, place, date, image } = formState;
    props.updateEvent({
      id: props.route.params._id,
      title,
      description,
      place,
      date,
      image,
    });
    props.navigation.navigate("Events");
  };

  const handleDelete = () => {
    props.eraseEvent(props.route.params._id);
    props.navigation.navigate("Events");
  };

  if (props.error) {
    return <Text>{props.error}</Text>;
  }

  if (props.loading) {
    return <ActivityIndicator />;
  }
  const { title, description, place, date, image } = props.route.params;
  return (
    <EditEventForm
      onSubmit={handleSubmit}
      onDelete={handleDelete}
      title={title}
      description={description}
      place={place}
      date={date}
      image={image}
    />
  );
};

EditEventScreen.propTypes = {
  updateEvent: PropTypes.func.isRequired,
  eraseEvent: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string,
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
