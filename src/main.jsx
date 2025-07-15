import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { DebtsProvider } from "./contexts/DebtsContext";
import { ExpensesProvider } from "./contexts/ExpensesContext";
import "./styles/index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <DebtsProvider>
        <ExpensesProvider>
          <App />
        </ExpensesProvider>
      </DebtsProvider>
    </BrowserRouter>
  </React.StrictMode>
);
