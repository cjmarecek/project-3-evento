import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import AddEventForm from '../../feature-specific/AddEventForm';
import { createEvent, postEventReset } from '../../../redux/actions/eventsActions';
import { ActivityIndicator, View, StyleSheet, Text } from 'react-native';

const AddEventScreen = (props) => {
  useEffect(() => {
    props.postEventReset();
  });

  const handleSubmit = async (formState) => {
    await props.createEvent(formState);
    if (props.error) {
      return;
    } else {
      props.navigation.navigate('Events');
    }
  };

  if (props.loading) {
    return (
      <View style={[StyleSheet.absoluteFill, styles.maybeRenderUploading]}>
        <ActivityIndicator color="#fff" size="large" />
      </View>
    );
  }
  if (props.error) {
    console.log(props.error.message)
    return (
      <View style={{ justifyContent: 'center', alignItems: 'center' }}>
        <Text>{`Something went wrong ${props.error.message}`}</Text>
      </View>
    );
  }else {
    return <AddEventForm onSubmit={handleSubmit} />;
  }
  
};

const mapDispatchToProps = (dispatch) => ({
  createEvent: (formState) => dispatch(createEvent(formState)),
  postEventReset: () => dispatch(postEventReset()),
});

const mapStateToProps = (state) => ({
  loading: state.events.newEvent.loading,
  error: state.events.newEvent.error,
});

const styles = StyleSheet.create({
  maybeRenderUploading: {
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(AddEventScreen);
