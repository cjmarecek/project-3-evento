import { AnonymousCredential } from "mongodb-stitch-react-native-sdk";
import { app } from "./app.js";

export function loginAnonymous() {
  // Allow users to log in anonymously
  const credential = new AnonymousCredential();
  app.auth
  .loginWithCredential(credential)
  .then((user) => {
    console.log(`Logged in as anonymous user with id: ${user.id}`)
  })
  .catch(err => {
      console.log(err);
  })
}

export function hasLoggedInUser() {
  // Check if there is currently a logged in user
  return app.auth.isLoggedIn;
}

export function getCurrentUser() {
  // Return the user object of the currently logged in user (if there is one)
  return app.auth.isLoggedIn ? app.auth.user : null;
}

export function logoutCurrentUser() {
  // Logout the currently logged in user (if there is one)
  const user = getCurrentUser();
  if (user) {
    return app.auth.logoutUserWithId(user.id);
  }
}
