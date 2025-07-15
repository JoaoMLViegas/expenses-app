import { useExpenses } from "../contexts/ExpensesContext";
import { useDebts } from "../contexts/DebtsContext";
import { Link } from "react-router-dom";
import "./HomePage.css";
import { ROUTES } from "../routes.js";

export default function HomePage() {
  const {
    getCurrentMonthExpenses,
    addExpense,
    editExpense,
    removeExpense,
    expenses,
  } = useExpenses();
  const currentExpenses = getCurrentMonthExpenses();
  const total = currentExpenses
    .reduce((sum, e) => sum + Number(e.value), 0)
    .toFixed(2);

  const { youAreOwed, youOwe } = useDebts();
  const totalOwedToYou = youAreOwed
    .reduce((sum, d) => sum + Number(d.value), 0)
    .toFixed(2);
  const totalYouOwe = youOwe
    .reduce((sum, d) => sum + Number(d.value), 0)
    .toFixed(2);

  return (
    <div className="home-container">
      <h1 className="home-title">Welcome to the Expenses App!</h1>
      <p className="home-subtitle">
        Easily manage your expenses and debts across devices.
      </p>

      <div className="summary-cards">
        <div className="card card-expenses">
          <h2>This Month's Expenses</h2>
          <p>{total}€</p>
          <Link to={ROUTES.EXPENSES} className="card-link">
            View Expenses
          </Link>
        </div>

        <div className="card card-owed">
          <h2>You Are Owed</h2>
          <p>{totalOwedToYou}€</p>
          <Link to={ROUTES.DEBTS} className="card-link">
            View Debts
          </Link>
        </div>

        <div className="card card-owe">
          <h2>You Owe</h2>
          <p>{totalYouOwe}€</p>
          <Link to={ROUTES.DEBTS} className="card-link">
            View Debts
          </Link>
        </div>
      </div>
    </div>
  );
}
