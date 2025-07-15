import { useNavigate, useLocation } from "react-router-dom";
import { useExpenses } from "../../contexts/ExpensesContext";
import "../../styles/Toolbar.css";
import { ROUTES } from "../../routes.js";

export default function ExpenseToolbar({ selectedId, setSelectedId }) {
  const navigate = useNavigate();
  const location = useLocation();
  const {
    expenses,
    addExpense,
    editExpense,
    removeExpense,
    getCurrentMonthExpenses,
  } = useExpenses();

  const handleAdd = () => {
    navigate("/expenses/form", {
      state: {
        initialExpense: {
          date: new Date().toISOString().split("T")[0],
          description: "",
          category: "",
          value: "",
        },
        id: null,
      },
    });
  };

  const handleEdit = () => {
    if (selectedId !== null) {
      const selectedExpense = expenses.find((e) => e.id === selectedId);
      navigate(ROUTES.EXPENSES_FORM, {
        state: {
          initialExpense: selectedExpense,
          id: selectedId,
        },
      });
    }
  };

  const handleRemove = () => {
    if (selectedId !== null) {
      removeExpense(selectedId);
      setSelectedId(null);
    }
  };

  const handleHistory = () => {
    navigate(ROUTES.EXPENSES_HISTORY, {
      state: {
        expenses: expenses,
      },
    });
  };

  return (
    <div className="toolbar">
      <button onClick={handleAdd}>Add</button>
      <button
        className="btn-danger"
        onClick={handleRemove}
        disabled={selectedId === null}
      >
        Remove
      </button>
      <button onClick={handleEdit} disabled={selectedId === null}>
        Edit
      </button>
      <button
        onClick={handleHistory}
        hidden={location.pathname === ROUTES.EXPENSES_HISTORY}
      >
        History
      </button>
    </div>
  );
}
