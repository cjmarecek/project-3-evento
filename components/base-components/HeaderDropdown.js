import React, { Component } from "react";
import { StyleSheet, Dimensions, View } from "react-native";

import Constants from "expo-constants";
const { height } = Dimensions.get("window");
const HEADER_BAR_HEIGHT = Constants.statusBarHeight + 65;
const BACKGROUD_COLOR = "#70AB33";
import Icon from "../shared-components/Icon";

import Menu, {
  MenuProvider,
  MenuOptions,
  MenuOption,
  MenuTrigger,
  renderers
} from "react-native-popup-menu";

import PropTypes from "prop-types";

const { SlideInMenu } = renderers;

class HeaderDropdown extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Menu
        renderer={SlideInMenu}
        rendererProps={{ anchorStyle: styles.anchorStyle }}
        style={{ height: 50 }}
      >
        <MenuTrigger customStyles={triggerStyles}>
          <Icon name="contact" color="white" size={40} />
        </MenuTrigger>
        <MenuOptions customStyles={optionsStyles}>
          <MenuOption
            text="Sign In"
            onSelect={() => this.props.navigation.navigate('SignIn')}
          ></MenuOption>
          <MenuOption
            text="About Keric"
            onSelect={() => this.props.navigation.navigate('AboutKeric')}
          />
        </MenuOptions>
      </Menu>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column"
  },
  backdrop: {
    backgroundColor: "white",
    opacity: 0.5
  },
  anchorStyle: {
    backgroundColor: "blue"
  }
});

const optionsStyles = {
  optionsContainer: {
    backgroundColor: BACKGROUD_COLOR,
    height: height - HEADER_BAR_HEIGHT
  },
  //whole options
  optionsWrapper: {
    backgroundColor: "#70AB33",
    padding: 10,
    paddingTop: 25
  },
  optionWrapper: {
    backgroundColor: "white",
    margin: 5,
    height: 50,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
    borderWidth: 0.5,
    borderColor: "black"
  },
  //https://github.com/instea/react-native-popup-menu/blob/master/examples/StylingExample.js
  // place around every option
  optionTouchable: {
    underlayColor: "white",
    activeOpacity: 70,
    borderRadius: 100,
    borderWidth: 0.5,
    borderColor: "black"
  },
  optionText: {
    color: "black",
    paddingRight: 25,
    fontSize: 17
  }
};

const triggerStyles = {
  triggerText: {
    color: "white"
  },
  triggerOuterWrapper: {
    backgroundColor: BACKGROUD_COLOR,
    padding: 5,
    flex: 1
  },
  triggerWrapper: {
    backgroundColor: BACKGROUD_COLOR,
    alignItems: "center",
    justifyContent: "center",
    flex: 1
  },
  triggerTouchable: {
    underlayColor: "darkblue",
    activeOpacity: 70,
    style: {
      flex: 1
    }
  }
};

HeaderDropdown.propTypes = {
  navigation: PropTypes.object.isRequired
};

export default HeaderDropdown;
