import React from "react";

import { TouchableHighlight, View, Text } from "react-native";
import { BACKGROUD_COLOR, INACTIVE_COLOR } from "../../styles/sharedStyles";
import { useNavigation } from "@react-navigation/native";

const SubmitEventButton = () => {
    const navigation = useNavigation()
  return (
    <TouchableHighlight
      onPress={() => navigation.navigate('Events')}
      underlayColor={BACKGROUD_COLOR}
      activeOpacity={0.5}
    >
      <View style={{ padding: 3, marginHorizontal: 10  }}>
        <Text style={{color:"white", fontWeight:"bold"}}>Submit</Text>
      </View>
    </TouchableHighlight>
  );
};

export default SubmitEventButton;
