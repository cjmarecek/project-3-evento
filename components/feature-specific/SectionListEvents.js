import React from 'react';
import {
  SectionList,
  Text,
  SafeAreaView,
  StyleSheet,
  View,
} from 'react-native';
import Event from './Event';
import ActivityIndicator from '../shared-components/ActivityIndicator';
import PropTypes from 'prop-types';
import containerBackground from '../../styles/sharedStyles'

const renderSectionHeader = ({ section }) => (
  <View style={styles.headerContainer}>
    <Text style={styles.heading1}>{section.title}</Text>
  </View>
);



const renderEmptyUpcomingEvents = () => {
  return (
    <View>
      <Text>No planed Events at the moment</Text>
    </View>
  );
};

const SectionListEvents = props => {

const sortUpcomingEvents = eventsInput => {
  const now = new Date().toISOString();
  const upcoming = eventsInput.filter(event => event.date > now);
  const sorted = upcoming.sort((a, b) => new Date(a.date) - new Date(b.date));
  return sorted;
};

const sortPastEvents = eventsInput => {
  const now = new Date().toISOString();
  const upcoming = eventsInput.filter(event => event.date < now);
  const sorted = upcoming.sort((a, b) => new Date(a.date) - new Date(b.date));
  return sorted;
};
  const sections = [
    { title: 'Upcoming', data: sortUpcomingEvents(props.events) },
    { title: 'Past', data: sortPastEvents(props.events) },
  ];

  return (
    <SafeAreaView style={[styles.eventsContainer, containerBackground]}>
      {props.loading ? (
        <ActivityIndicator />
      ) : (
        <SectionList
          keyExtractor={item => item._id}
          sections={sections}
          renderItem={({ item }) => (
            <Event {...item} onSelectEvent={props.onSelectEvent} />
          )}
          renderSectionHeader={renderSectionHeader}
          ListEmptyComponent={renderEmptyUpcomingEvents}
          refreshing={props.refreshing}
          onRefresh={() => props.handleOnRefresh()}
        />
      )}
    </SafeAreaView>
  );
};

SectionListEvents.propTypes = {
  contacts: PropTypes.array,
};

export default SectionListEvents;

const styles = StyleSheet.create({
  eventsContainer: {
    height: '100%',
  },
  headerContainer: {
    flex: 1,
    justifyContent: 'center',
    height: 50,
    marginHorizontal: 5,
    paddingHorizontal: 5,
    // borderWidth: 1
    backgroundColor: '#ecf0f1',
  },
  heading1: {
    fontSize: 36,
    lineHeight: 41,
    fontWeight: 'bold',
  },
});
