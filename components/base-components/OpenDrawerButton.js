import React from "react";
import { TouchableHighlight, View } from "react-native";
import Icon from "../shared-components/Icon";
import { BACKGROUD_COLOR, INACTIVE_COLOR } from "../../styles/sharedStyles";
import { useNavigation } from "@react-navigation/native";


export default OpenDrawerButton = () => {
    const navigation = useNavigation()
  return (
    <TouchableHighlight
      onPress={() => navigation.openDrawer()}
      underlayColor={BACKGROUD_COLOR}
      activeOpacity={0.5}
    >
      <View style={{ padding: 3, marginHorizontal: 10 }}>
        <Icon name="menu" color={INACTIVE_COLOR} size={40} />
      </View>
    </TouchableHighlight>
  );
};

