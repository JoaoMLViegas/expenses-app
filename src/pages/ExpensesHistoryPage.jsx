import { useState } from "react";
import { useExpenses } from "../contexts/ExpensesContext";
import ExpenseTable from "../components/expenses/ExpenseTable";
import ExpenseToolbar from "../components/expenses/ExpenseToolbar";

export default function ExpensesHistoryPage() {
  const { addExpense, editExpense, removeExpense, expenses } = useExpenses();

  const [selectedId, setSelectedId] = useState(null);

  return (
    <div>
      <h2>All Expenses History</h2>
      <p>
        Total Expenses:{" "}
        {expenses.reduce((sum, e) => sum + Number(e.value), 0).toFixed(2)}€
      </p>
      <ExpenseTable
        expenses={expenses}
        selectedId={selectedId}
        setSelectedId={setSelectedId}
      />
      <ExpenseToolbar
        allExpenses={expenses}
        selectedId={selectedId}
        setSelectedId={setSelectedId}
        addExpense={addExpense}
        editExpense={editExpense}
        removeExpense={removeExpense}
      />
    </div>
  );
}
