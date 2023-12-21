import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

ReactDOM.hydrateRoot(
  // @ts-ignore
  document.getElementById("root"),
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
