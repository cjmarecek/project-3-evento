import React from 'react';
import { connect } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

import { TouchableHighlight, View, Text } from 'react-native';
import { BACKGROUD_COLOR, INACTIVE_COLOR } from '../../styles/sharedStyles';

const AddEventButton = props => {
  const navigation = useNavigation();
  return props.token ? (
    <TouchableHighlight
      onPress={() => navigation.navigate('Add Event')}
      underlayColor={BACKGROUD_COLOR}
      activeOpacity={0.5}
    >
      <View style={{ padding: 3, marginHorizontal: 15 }}>
        <Text style={{ color: INACTIVE_COLOR, fontWeight: 'bold' }}>Add</Text>
      </View>
    </TouchableHighlight>
  ) : null;
};

const mapStateToProps = state => ({
  token: state.user.token,
});

export default connect(mapStateToProps)(AddEventButton);
