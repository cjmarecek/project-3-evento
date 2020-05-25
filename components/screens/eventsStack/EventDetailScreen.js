import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
} from 'react-native';

import { dateToTimeString, dateToDateString } from '../../shared-components/FormatDates';
import { WINDOW_WIDTH, IMAGE_BACKGROUND_COLOR} from '../../../styles/sharedStyles';
import { API_URL } from 'react-native-dotenv';


export default EventDetailScreen = ({ route, navigation }) => {
  let imageURL = API_URL + '/' + route.params.image;

  return (
    <ScrollView
      scrollToOverflowEnabled={false}
      contentContainerStyle={styles.eventContainer}
    >
      <View style={styles.headerContainer}>
        <Text style={styles.heading1}>{route.params.title}</Text>
      </View>
      <View style={styles.imageContainer}>
        
        {route.params.image ? (
            <Image
              source={{ uri: imageURL }}
              style={styles.image}
            />
          ) : (
            <Image
              source={require('../../../assets/image-not-available.png')}
              style={styles.image}
            />
          )}
      </View>
      <Text style={styles.place}>{route.params.place}</Text>
      <View style={styles.dates}>
        <Text style={styles.dateTime}>
          {dateToTimeString(route.params.date)}
        </Text>
        <Text style={styles.dateTime}>
          {dateToDateString(route.params.date)}
        </Text>
      </View>
      <Text style={styles.description}>{route.params.description}</Text>
      
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  eventContainer: {
    margin: 5,
    // borderWidth: 1,
    width: WINDOW_WIDTH - 20,
    paddingHorizontal: 10,
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderRadius: 5,
    paddingBottom: 20,
    marginBottom: 30,
  },
  headerContainer: {
    height: 'auto',
    width: '100%',
    margin: 1,
    // borderWidth: 1
  },
  heading1: {
    fontSize: 26,
    lineHeight: 28,
    justifyContent: 'flex-start',
    alignItems: 'center',
    fontWeight: 'bold',
  },
  imageContainer: {
    width: '100%',
    margin: 1,
    // borderWidth: 1,
    alignItems: 'center',
  },
  image: {
    alignItems: 'center',
    width: '100%',
    margin: 1,
    // borderWidth: 1,
    resizeMode: 'contain',
    backgroundColor: IMAGE_BACKGROUND_COLOR,
    height: 250,
  },
  dateTime: {
    margin: 1,
    // borderWidth: 1,
    fontSize: 18,
    alignSelf: 'flex-start',
  },
  place: {
    margin: 1,
    // borderWidth: 1,
    fontSize: 24,
    fontWeight: '400',
    alignSelf: 'flex-start',
  },
  dates: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  description: {
    margin: 1,
    // borderWidth: 1,
    marginTop: 10,
  },
});
