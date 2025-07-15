import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useExpenses } from "../contexts/ExpensesContext";
import { ROUTES } from "../routes.js";

export default function ExpensesFormPage() {
  const navigate = useNavigate();
  const { state } = useLocation();

  const { addExpense, editExpense } = useExpenses();

  const { initialExpense, id } = state || {};
  const isEdit = id !== null;

  const [expense, setExpense] = useState(
    initialExpense
      ? { ...initialExpense }
      : {
          date: new Date().toISOString().split("T")[0],
          description: "",
          category: "",
          value: "",
        }
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setExpense((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const filledExpense = { ...expense };
    if (isEdit) {
      editExpense(filledExpense, id);
    } else {
      addExpense(filledExpense);
    }
    navigate(ROUTES.EXPENSES);
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <label>
          Date:
          <input
            type="date"
            name="date"
            value={expense.date}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Description:
          <input
            name="description"
            value={expense.description}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Category:
          <input
            name="category"
            value={expense.category}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Value (€):
          <input
            type="number"
            name="value"
            value={expense.value}
            onChange={handleChange}
            required
          />
        </label>
        <button type="submit">{isEdit ? "Save Changes" : "Add Expense"}</button>
      </form>
    </div>
  );
}
