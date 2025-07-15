import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ExpensesPage from "./pages/ExpensesPage";
import DebtsPage from "./pages/DebtsPage";
import Navbar from "./components/Navbar";
import DataBackupPage from "./pages/DataBackupPage";
import DebtsFormPage from "./pages/DebtsFormPage";
import ExpensesFormPage from "./pages/ExpensesFormPage";
import ExpensesHistoryPage from "./pages/ExpensesHistoryPage";
import { ROUTES } from "./routes";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path={ROUTES.HOME} element={<HomePage />} />
        <Route path={ROUTES.EXPENSES} element={<ExpensesPage />} />
        <Route path={ROUTES.DEBTS} element={<DebtsPage />} />
        <Route path={ROUTES.BACKUP} element={<DataBackupPage />} />
        <Route path={ROUTES.DEBTS_FORM} element={<DebtsFormPage />} />
        <Route path={ROUTES.EXPENSES_FORM} element={<ExpensesFormPage />} />
        <Route
          path={ROUTES.EXPENSES_HISTORY}
          element={<ExpensesHistoryPage />}
        />
      </Routes>
    </>
  );
}

export default App;
