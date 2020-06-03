import React from "react";
import {
  SectionList,
  Text,
  SafeAreaView,
  StyleSheet,
  View,
} from "react-native";
import PropTypes from "prop-types";

// Components
import Event from "./Event";
import ActivityIndicator from "../shared-components/ActivityIndicator";

import containerBackground from "../../styles/sharedStyles";
const styles = StyleSheet.create({
  eventsContainer: {
    height: "100%",
  },
  headerContainer: {
    flex: 1,
    justifyContent: "center",
    height: 50,
    marginHorizontal: 5,
    paddingHorizontal: 5,
    // borderWidth: 1
    backgroundColor: "#ecf0f1",
  },
  heading1: {
    fontSize: 36,
    lineHeight: 41,
    fontWeight: "bold",
  },
});

const SectionListEvents = (props) => {
  const renderSectionHeader = ({ section }) => (
    <View style={styles.headerContainer}>
      <Text style={styles.heading1}>{section.title}</Text>
    </View>
  );

  const getSortedUpcomingEvents = (events) => {
    if (events === null || events.length === 0) return [];
    return events
      .filter((event) => event.date > new Date().toISOString())
      .sort((a, b) => new Date(a.date) - new Date(b.date));
  };

  const getSortedPastEvents = (events) => {
    if (events === null || events.length === 0) return [];
    return events
      .filter((event) => event.date < new Date().toISOString())
      .sort((a, b) => new Date(a.date) - new Date(b.date));
  };

  const sections = [
    { title: "Upcoming", data: getSortedUpcomingEvents(props.events) },
    { title: "Past", data: getSortedPastEvents(props.events) },
  ];

  return (
    <SafeAreaView style={[styles.eventsContainer, containerBackground]}>
      {props.loading ? (
        <ActivityIndicator />
      ) : (
        <SectionList
          keyExtractor={(item) => item._id}
          sections={sections}
          renderItem={({ item }) => (
            <Event {...item} onSelectEvent={props.onSelectEvent} />
          )}
          renderSectionHeader={renderSectionHeader}
          refreshing={props.loading}
          onRefresh={() => props.handleOnRefresh()}
        />
      )}
    </SafeAreaView>
  );
};

SectionListEvents.propTypes = {
  events: PropTypes.array.isRequired,
  onSelectEvent: PropTypes.func.isRequired,
  handleOnRefresh: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string,
};

export default SectionListEvents;
