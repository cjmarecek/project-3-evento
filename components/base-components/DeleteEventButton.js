import React from 'react';
import { Alert, Button } from 'react-native';

export default DeleteEventButton = props => {
  return (
    <Button
      onPress={() =>
        Alert.alert(
          'Delete Event: ',
          `${props.title}`,
          [
            {
              text: 'Cancel',
              onPress: () => console.log('Cancel Pressed'),
              style: 'cancel',
            },
            { text: 'Delete', onPress: () => props.onDelete(props.id) },
          ],
          { cancelable: false },
        )
      }
      title="Delete Event"
    />
  );
};
