import { useState } from "react";
import { useExpenses } from "../contexts/ExpensesContext";
import ExpenseTable from "../components/expenses/ExpenseTable";
import ExpenseToolbar from "../components/expenses/ExpenseToolbar";

export default function ExpensesPage() {
  const {
    getCurrentMonthExpenses,
    addExpense,
    editExpense,
    removeExpense,
    expenses,
  } = useExpenses();

  const [selectedId, setSelectedId] = useState(null);

  const currentExpenses = getCurrentMonthExpenses();

  const total = currentExpenses
    .reduce((sum, e) => sum + Number(e.value), 0)
    .toFixed(2);

  return (
    <div>
      <h2>This Month's Total Expenses: {total}€</h2>
      <ExpenseTable
        expenses={currentExpenses}
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
