import { Stitch } from "mongodb-stitch-react-native-sdk";

// TODO: Add your Stitch app's App ID
const APP_ID = "keric-app-fouoc";

// TODO: Initialize the app client
const app = Stitch.hasAppClient(APP_ID)
  ? Stitch.defaultAppClient(APP_ID)
  : Stitch.initializeDefaultAppClient(APP_ID);

export default { app };