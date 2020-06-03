import React from "react";
import { PropTypes } from "prop-types";

// Redux
import { connect } from "react-redux";
import {
  fetchEvents,
  fetchEventsReset,
} from "../../../redux/actions/eventsActions";

// Components
import SectionListEvents from "../../feature-specific/SectionListEvents";

class EventsScreen extends React.Component {
  handleOnSelectEvent = (event) => {
    this.props.navigation.push("Event Detail", {
      _id: event._id,
      title: event.title,
      place: event.place,
      date: event.date,
      description: event.description,
      image: event.image,
    });
  };

  handleOnRefresh = () => {
    this.props.fetchEvents();
  };

  componentDidMount() {
    this.props.fetchEventsReset();
    this.props.fetchEvents();
  }

  render() {
    const { events, loading, error } = this.props;
    return (
      <SectionListEvents
        events={events}
        onSelectEvent={this.handleOnSelectEvent}
        handleOnRefresh={this.handleOnRefresh}
        loading={loading}
        error={error}
      />
    );
  }
}

EventsScreen.propTypes = {
  fetchEvents: PropTypes.func.isRequired,
  fetchEventsReset: PropTypes.func.isRequired,
  events: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string,
};

const mapStateToProps = (state) => ({
  events: state.events.events,
  loading: state.events.loading,
  error: state.events.error,
});

const mapActionsToProps = { fetchEvents, fetchEventsReset };

export default connect(mapStateToProps, mapActionsToProps)(EventsScreen);
