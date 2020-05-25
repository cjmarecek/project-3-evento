import React from 'react';
import { connect } from 'react-redux';
import { TouchableHighlight, View, Text } from 'react-native';
import { BACKGROUD_COLOR, INACTIVE_COLOR } from '../../styles/sharedStyles';
import { useNavigation } from '@react-navigation/native';

const EditEventButton = props => {
  const navigation = useNavigation();

  return props.token ? (
    <TouchableHighlight
      onPress={() =>
        navigation.navigate('Edit Event', {
          _id: props.route.params._id,
          title: props.route.params.title,
          description: props.route.params.description,
          place: props.route.params.place,
          date: props.route.params.date,
          image: props.route.params.image,
        })
      }
      underlayColor={BACKGROUD_COLOR}
      activeOpacity={0.5}
    >
      <View style={{ padding: 3, marginHorizontal: 15 }}>
        <Text style={{ color: INACTIVE_COLOR, fontWeight: 'bold' }}>Edit</Text>
      </View>
    </TouchableHighlight>
  ) : null;
};

const mapStateToProps = state => ({
  token: state.user.token,
});

export default connect(mapStateToProps)(EditEventButton);
