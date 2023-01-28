import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import ThemeMode from "./provider/themeMode";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.Fragment>
    <ThemeMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ThemeMode>
  </React.Fragment>
);
