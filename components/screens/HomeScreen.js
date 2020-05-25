import React from 'react';
import { View, Text, StyleSheet } from "react-native";

class HomeScreen extends React.Component {
  render() {
    return <View style={styles.container}>

 </View>;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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

export default HomeScreen;
