import { UserManager } from "oidc-client";
import Oidc from "oidc-client";
import oidcConfig from "../config/oidcConfig";
import "babel-polyfill";

const User = new UserManager(oidcConfig);

Oidc.Log.logger = console;
Oidc.Log.level = Oidc.Log.INFO;

User.events.addUserLoaded((user) => {
  console.log("New User Loaded：", user);
  console.log("Acess_token: ", user.access_token);
});

User.events.addAccessTokenExpiring((args) => {
  console.log("AccessToken Expiring：", args);
});

User.events.addAccessTokenExpired((args) => {
  console.log("AccessToken Expired：", args);

  User.signoutRedirect()
    .then((res) => {
      console.log("signed out", res);
    })
    .catch((error) => {
      console.log(error);
    });
});

User.events.addSilentRenewError((args) => {
  console.error("Silent Renew Error：", args);
});

User.events.addUserSignedOut((args) => {
  console.log("UserSignedOut：", args);

  User.signoutRedirect()
    .then(function (res) {
      console.log("signed out", res);
    })
    .catch(function (err) {
      console.log(err);
    });
});

export default User;
