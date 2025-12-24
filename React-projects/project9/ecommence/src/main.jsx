import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { store } from "./store.js"; // redux tool kit
import { Provider } from "react-redux";  // redux tool kit

createRoot(document.getElementById("root")).render(
    <Provider store={store}>
      <App />
    </Provider>
);