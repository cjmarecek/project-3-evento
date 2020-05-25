import React from "react";
import { View, Text, StyleSheet } from "react-native";

class AboutKericScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>About Keric</Text>
        
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
    // borderRadius: 4,
    // borderWidth: 0.5,
    // borderColor: "black"
  },
  title: {
    margin: 10,
    fontSize: 38,
    fontWeight: "bold"
  }
});

export default AboutKericScreen;
