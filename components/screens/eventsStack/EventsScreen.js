import React from 'react';
import { View, Text} from 'react-native';
import { connect } from 'react-redux';
import {
  fetchEvents,
  fetchEventsReset,
} from '../../../redux/actions/eventsActions';

import SectionListEvents from '../../feature-specific/SectionListEvents';

class EventsScreen extends React.Component {
  state = {
    refreshing: false,
  };
  handleOnSelectEvent = event => {
    this.props.navigation.push('Event Detail', {
      _id: event._id,
      title: event.title,
      place: event.place,
      date: event.date,
      description: event.description,
      image: event.image,
    });
  };

  handleOnRefresh = () => {
    this.setState({ refreshing: true }, () => {
      this.props.fetchEventsReset();
      this.props.fetchEvents();
      this.setState({ refreshing: false });
    });
  };

  componentDidMount() {
    this.props.fetchEventsReset();
    this.props.fetchEvents();
  }

  render() {
    
    // if (this.props.error) {
    //   return <Text>Error! {this.props.error.message}</Text>;
    // } else {
      return (
        <View>
          <SectionListEvents
            events={this.props.events}
            onSelectEvent={this.handleOnSelectEvent}
            handleOnRefresh={this.handleOnRefresh}
            loading={this.props.loading}
            refreshing={this.state.refreshing}
          />
        </View>
      );
    // }
  }
}

const mapStateToProps = state => ({
  events: state.events.eventsList.events,
  loading: state.events.eventsList.loading,
  error: state.events.eventsList.error,
});

const mapDispatchToProps = dispatch => ({
  fetchEvents: () => dispatch(fetchEvents()),
  fetchEventsReset: () => dispatch(fetchEventsReset()),
});

export default connect(mapStateToProps, mapDispatchToProps)(EventsScreen);
