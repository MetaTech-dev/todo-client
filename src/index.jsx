import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Auth0Provider } from "@auth0/auth0-react";
import { AppSettingsProvider } from "./contexts/AppContext";
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Auth0Provider
    domain="metatech-todo-dev.us.auth0.com"
    clientId="mg6cH2lq8jIEpEzIqgdpP3G2pethhWJq"
    authorizationParams={{
      redirect_uri: window.location.origin,
      audience: "todo",
    }}
  >
    <AppSettingsProvider>
      <App />
    </AppSettingsProvider>
  </Auth0Provider>
);

reportWebVitals();
