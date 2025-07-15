import { createContext, useContext, useEffect, useState } from "react";

const ExpensesContext = createContext();

export const useExpenses = () => useContext(ExpensesContext);

export function ExpensesProvider({ children }) {
  const [expenses, setExpenses] = useState(() => {
    const stored = localStorage.getItem("expenses");
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [expenses]);

  const addExpense = (expense) => {
    const id = Date.now().toString();
    setExpenses((prev) => [...prev, { ...expense, id }]);
  };

  const editExpense = (updatedExpense, id) => {
    setExpenses((prev) =>
      prev.map((e) => (e.id === id ? { ...updatedExpense, id } : e))
    );
  };

  const removeExpense = (id) => {
    setExpenses((prev) => prev.filter((e) => e.id !== id));
  };

  const getCurrentMonthExpenses = () => {
    const now = new Date();
    return expenses.filter((e) => {
      const date = new Date(e.date);
      return (
        date.getFullYear() === now.getFullYear() &&
        date.getMonth() === now.getMonth()
      );
    });
  };

  return (
    <ExpensesContext.Provider
      value={{
        expenses,
        addExpense,
        editExpense,
        removeExpense,
        getCurrentMonthExpenses,
      }}
    >
      {children}
    </ExpensesContext.Provider>
  );
}
