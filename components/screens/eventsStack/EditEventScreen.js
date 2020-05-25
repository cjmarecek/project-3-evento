import React from 'react';
import { connect } from 'react-redux';
import {
  fetchEvent,
  updateEvent,
  fetchEvents,
  eraseEvent,
  fetchEventReset,
} from '../../../redux/actions/eventsActions';
import EditEventForm from '../../feature-specific/EditEventForm';

const EditEventScreen = props => {
  const handleSubmit = formState => {
    props.updateEvent({
      id: props.route.params._id,
      title: formState.title,
      description: formState.description,
      place: formState.place,
      date: formState.date,
      image: formState.image,
    });
    props.fetchEvents();
    props.navigation.navigate('Events');
  };

  const handleDelete = () => {
    props.eraseEvent(props.route.params._id);
    props.fetchEvents();
    props.navigation.navigate('Events');
  };

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

const mapStateToProps = state => ({
  loading: state.events.event.loading,
  error: state.events.event.error,
});

const mapDispatchToProps = dispatch => ({
  fetchEvent: id => dispatch(fetchEvent(id)),
  fetchEventReset: () => dispatch(fetchEventReset()),
  fetchEvents: () => dispatch(fetchEvents()),
  updateEvent: event => dispatch(updateEvent(event)),
  eraseEvent: id => dispatch(eraseEvent(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditEventScreen);
