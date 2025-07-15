import { createContext, useContext, useState, useEffect } from "react";

const DebtsContext = createContext();

export const useDebts = () => useContext(DebtsContext);

export function DebtsProvider({ children }) {
  const [debts, setDebts] = useState(() => {
    const stored = localStorage.getItem("debts");
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem("debts", JSON.stringify(debts));
  }, [debts]);

  const addDebt = (newDebt) => {
    setDebts((prev) => [...prev, newDebt]);
  };

  const editDebt = (updatedDebt, index, type) => {
    setDebts((prev) => {
      const newDebts = [...prev];
      newDebts[index] = updatedDebt;
      return newDebts;
    });
  };

  const removeDebt = (type, filteredIndex) => {
    setDebts((prev) => {
      const fullIndex = prev.findIndex(
        (d, i) => d.type === type && i === filteredIndex
      );
      return prev.filter((_, i) => i !== fullIndex);
    });
  };

  const youAreOwed = debts.filter((d) => d.type === "owedToYou");
  const youOwe = debts.filter((d) => d.type === "youOwe");

  return (
    <DebtsContext.Provider
      value={{ debts, addDebt, editDebt, removeDebt, youAreOwed, youOwe }}
    >
      {children}
    </DebtsContext.Provider>
  );
}
