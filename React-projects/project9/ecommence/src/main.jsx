import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { store } from "./store.js"; // redux tool kit
import { Provider } from "react-redux";  // redux tool kit
import { BrowserRouter, createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
    </BrowserRouter>
);