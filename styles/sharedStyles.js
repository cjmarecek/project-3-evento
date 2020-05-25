import { Dimensions } from 'react-native';
import Constants from 'expo-constants';

export const BACKGROUD_COLOR = '#70AB33';
export const ACTIVE_COLOR = 'white';
export const INACTIVE_COLOR = 'white';
export const BUTTON_PRESSED_COLOR = '#9AD162';
export const IMAGE_BACKGROUND_COLOR = 'black'

export const WINDOW_WIDTH = Dimensions.get('window').width;
export const STATUS_BAR_HEIGHT = Constants.statusBarHeight;
export const HEADER_BAR_HEIGHT = STATUS_BAR_HEIGHT + 55;

export const containerBackground = {
  backgroundColor: '#ecf0f1',
  height: '100%',
}
