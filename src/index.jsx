import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { AppSettingsProvider } from "./contexts/AppContext";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <AppSettingsProvider>
    <App />
  </AppSettingsProvider>
);

reportWebVitals();
