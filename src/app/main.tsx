import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "./globalStyles.scss";
import { Provider } from "react-redux";
import { setupStore } from "./rootStore.ts";

const store = setupStore();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
        <ToastContainer
          position="top-right"
          autoClose={3000}
          closeOnClick
          theme="dark"
          pauseOnHover={false}
          draggable
        />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
