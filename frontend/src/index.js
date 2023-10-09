import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css"; // Asegúrate de que esta línea está presente
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { UserProvider } from "./components/UserContext";
import Modal from "react-modal";
import { AuthProvider } from "./context/AuthProvider";

// Define el elemento raíz (puede ser cualquier elemento, por ejemplo, un div)
const rootElement = document.getElementById("root");

// Establece el elemento raíz para React Modal
Modal.setAppElement(rootElement);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <UserProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
      </UserProvider>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
