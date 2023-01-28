import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "bootstrap/dist/css/bootstrap.css";
import { Auth0Provider } from "@auth0/auth0-react";
import locationOf from "./locationOf";

ReactDOM.render(
  <Auth0Provider
    domain={process.env.REACT_APP_AUTH0_DOMAIN}
    clientId={process.env.REACT_APP_AUTH0_CLIENT_ID}
    audience={process.env.REACT_APP_AUTH0_API_AUDIENCE}
    redirectUri={window.location.origin + locationOf()}
  >
    <App />
  </Auth0Provider>,
  document.getElementById("root")
);
