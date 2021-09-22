import { WebStorageStateStore } from "oidc-client";

export default {
  userStore: new WebStorageStateStore({ store: window.localStorage }),
  client_root: "http://localhost:8080/",
  authority: "https://demo.identityserver.io",
  client_id: "interactive.public",
  scope: "openid profile email api offline_access",
  response_type: "code",
  redirect_uri: "http://localhost:8080/dashboard",
  post_logout_redirect_uri: "http://localhost:8080/login",
  accessTokenExpiringNotificationTime: 5,
  filterProtocolClaims: true,
  loadUserInfo: true,
};
