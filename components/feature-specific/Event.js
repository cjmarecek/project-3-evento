import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableHighlight,
} from 'react-native';
import PropTypes from 'prop-types';
import { dateToString } from '../shared-components/FormatDates';
import { API_URL } from 'react-native-dotenv';
import {IMAGE_BACKGROUND_COLOR} from '../../styles/sharedStyles'

export default Event = (props) => {
  let imageURL = API_URL + '/' + props.eventImage;
  return (
    <TouchableHighlight onPress={() => props.onSelectEvent(props)}>
      <View style={styles.eventContainer}>
        <View style={styles.headerContainer}>
          <View style={styles.header}>
            <Text style={styles.header2} ellipsizeMode="tail" numberOfLines={2}>
              {props.title}
            </Text>
            <Text style={styles.dateTime}>{dateToString(props.date)}</Text>
          </View>

          {props.eventImage ? (
            <Image
              source={{ uri: imageURL }}
              style={styles.headerImage}
            />
          ) : (
            <Image
              source={require('../../assets/image-not-available.png')}
              style={styles.headerImage}
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

const styles = StyleSheet.create({
  eventContainer: {
    // borderWidth: 1,
    backgroundColor: 'white',
    borderRadius: 5,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    margin: 5,
    padding: 5,
    height: 137,
    justifyContent: 'space-between',
  },
  headerContainer: {
    margin: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: '50%',
  },
  header: {
    margin: 1,
    flex: 2,
    justifyContent: 'center',
  },
  header2: {
    margin: 1,
    fontSize: 22,
    fontWeight: '500',
  },
  dateTime: {
    margin: 1,
    fontSize: 10,
  },
  headerImage: {
    margin: 1,
    flex: 1,
    height: 'auto',
    resizeMode: 'contain',
    backgroundColor: IMAGE_BACKGROUND_COLOR,
  },
  shortDescription: {
    margin: 1,
    height: '42%',
  },
  text: {},
});

Event.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  title: PropTypes.string,
  date: PropTypes.string,
};
