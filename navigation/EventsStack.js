import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import {
  screenOptionsConfig,
  addEventOptions,
  eventsOptions,
  editEventOptions,
  eventDetailOptions,
} from './screenOptionsConfigs';

import EventsScreen from '../components/screens/eventsStack/EventsScreen';
import AddEventScreen from '../components/screens/eventsStack/AddEventScreen';
import EditEventScreen from '../components/screens/eventsStack/EditEventScreen';
import EventDetailScreen from '../components/screens/eventsStack/EventDetailScreen';

const EventsStack = createStackNavigator();

export default function Events() {
  return (
    <EventsStack.Navigator screenOptions={screenOptionsConfig}>
      <EventsStack.Screen
        name="Events"
        component={EventsScreen}
        options={eventsOptions}
      />
      <EventsStack.Screen
        name="Add Event"
        component={AddEventScreen}
        options={addEventOptions}
      />
      <EventsStack.Screen
        name="Edit Event"
        component={EditEventScreen}
        options={editEventOptions}
      />
      <EventsStack.Screen
        name="Event Detail"
        component={EventDetailScreen}
        options={eventDetailOptions}
      />
    </EventsStack.Navigator>
  );
}
