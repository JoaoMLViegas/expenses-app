import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter } from "react-router-dom";
import App from "./App";
import { DebtsProvider } from "./contexts/DebtsContext";
import { ExpensesProvider } from "./contexts/ExpensesContext";
import "./styles/index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HashRouter>
      <DebtsProvider>
        <ExpensesProvider>
          <App />
        </ExpensesProvider>
      </DebtsProvider>
    </HashRouter>
  </React.StrictMode>
);
