import User from "./oidcClientService";

export default class AuthService {
  signIn = {
    mainWindow() {
      return User.signinRedirect();
    },

    diffWindow() {
      return User.signinRedirect({ redirect_uri: "/login" });
    },

    popup() {
      return User.signinPopup();
    },
    silent() {
      return User.signinSilent();
    },
  };

  signInCallBack = {
    callBack() {
      return User.signinCallback();
    },

    async redirect() {
      const user = await User.signinRedirectCallback();
      return user;
    },

    popup() {
      return User.signinPopupCallback();
    },

    silent() {
      return User.signinSilentCallback();
    },
  };

  signOut = {
    mainWindow() {
      // User.settings.post_logout_redirect_uri = "/login";
      return User.signoutRedirect();
    },

    diffWindow() {
      //  (User.settings.post_logout_redirect_uri = "/login");
      return User.signoutRedirect();
    },

    popup(options) {
      return User.signoutPopup(options);
    },
  };

  signOutCallBack = {
    callback() {
      return User.signoutCallback();
    },

    redirect() {
      // User.settings.post_logout_redirect_uri = "/login";
      return User.signoutRedirectCallback();
    },
  };

  resource = {
    async user() {
      const user = await User.getUser();
      const userCurrent = !!user && !user.expired;
      return userCurrent;
    },
  };
  token = {
    async getAccessToken() {
      const user = await User.getUser();
      return !!user && !user.expired ? user.access_token : null;
    },
  };
}
