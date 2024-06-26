import React from "react";
import ReactDOM from "react-dom/client";
import App from "./Pages/App/App";
import { BrowserRouter } from "react-router-dom";

localStorage.debug = "mern:*";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
