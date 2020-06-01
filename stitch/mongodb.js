import { RemoteMongoClient } from "mongodb-stitch-react-native-sdk";
import { app } from "./app";

//  Initialize a MongoDB Service Client
const mongoClient = () => app.getServiceClient(
    RemoteMongoClient.factory,
    "mongodb-atlas"
  );

export default { mongoClient };