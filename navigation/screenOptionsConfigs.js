import React from 'react';
import {
  BACKGROUD_COLOR,
  ACTIVE_COLOR,
  INACTIVE_COLOR,
  HEADER_BAR_HEIGHT,
} from '../styles/sharedStyles';

import GoBackButton from '../components/base-components/GoBackButton';
import OpenDrawerButton from '../components/base-components/OpenDrawerButton';
import AddEventButton from '../components/base-components/AddEventButton';
import EditEventButton from '../components/base-components/EditEventButton';

export const screenOptionsConfig = {
  headerStyle: {
    backgroundColor: BACKGROUD_COLOR,
    height: HEADER_BAR_HEIGHT,
  },
  headerTintColor: INACTIVE_COLOR,
  headerPressColorAndroid: ACTIVE_COLOR,
  headerTitleStyle: {
    fontWeight: 'bold',
    fontSize: 19,
  },
  headerLeft: () => <OpenDrawerButton />,
};

export const addEventOptions = {
  headerTitle: ' ',
  headerLeft: () => <GoBackButton />,
};

export const editEventOptions = {
  headerTitle: ' ',
  headerLeft: () => <GoBackButton />,
};

export const eventsOptions = {
  headerRight: () => <AddEventButton />,
};

export const eventDetailOptions = ({ route }) => {
  return {
    headerTitle: ' ',
    headerLeft: () => <GoBackButton />,
    headerRight: () => <EditEventButton route={route} />,
  };
};

export const signInOptions = (isSignout) => {
  return {
    title: ' ',
    animationTypeForReplace: isSignout ? 'pop' : 'push',
    headerLeft: () => <GoBackButton />,
    headerShown: false,
  };
};

export const signOutOptions = () => {
  return {
    headerTitle: ' ',
    headerLeft: () => <GoBackButton />,
  };
};
