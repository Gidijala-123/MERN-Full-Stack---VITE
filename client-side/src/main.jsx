import React from "react";
import ReactDOM from "react-dom/client"; // Use createRoot for React 18
import { Provider } from "react-redux";
import App from "./App";
import { store, persistor } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";
import "./index.css";
import ThemeProvider from "./components/ThemeProvider";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <PersistGate loading={null} persistor={persistor}>
    <Provider store={store}>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </Provider>
  </PersistGate>
);
