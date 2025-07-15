import { Link } from "react-router-dom";
import "./Navbar.css";
import { ROUTES } from "../routes.js";

export default function Navbar() {
  return (
    <nav className="navbar">
      <ul>
        <li>
          <Link to={ROUTES.HOME}>Home</Link>
        </li>
        <li>
          <Link to={ROUTES.EXPENSES}>Expenses</Link>
        </li>
        <li>
          <Link to={ROUTES.DEBTS}>Debts</Link>
        </li>
        <li>
          <Link to={ROUTES.BACKUP}>Import/Export Data</Link>
        </li>
      </ul>
    </nav>
  );
}
