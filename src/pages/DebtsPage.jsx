import { useState } from "react";
import DebtTable from "../components/debts/DebtTable";
import DebtToolbar from "../components/debts/DebtToolbar";
import { useDebts } from "../contexts/DebtsContext";

export default function DebtsPage() {
  const { youAreOwed, youOwe } = useDebts();

  const [selectedOwedIndex, setSelectedOwedIndex] = useState(null);
  const [selectedOweIndex, setSelectedOweIndex] = useState(null);

  const totalOwedToYou = youAreOwed
    .reduce((sum, d) => sum + Number(d.value), 0)
    .toFixed(2);
  const totalYouOwe = youOwe
    .reduce((sum, d) => sum + Number(d.value), 0)
    .toFixed(2);

  return (
    <div>
      <h2>Total You Are Owed: {totalOwedToYou}€</h2>
      <DebtTable
        debts={youAreOwed}
        selectedIndex={selectedOwedIndex}
        setSelectedIndex={setSelectedOwedIndex}
        type="owedToYou"
      />
      <DebtToolbar
        selectedIndex={selectedOwedIndex}
        setSelectedIndex={setSelectedOwedIndex}
        type="owedToYou"
      />

      <h2>Total You Owe: {totalYouOwe}€</h2>
      <DebtTable
        debts={youOwe}
        selectedIndex={selectedOweIndex}
        setSelectedIndex={setSelectedOweIndex}
        type="youOwe"
      />
      <DebtToolbar
        selectedIndex={selectedOweIndex}
        setSelectedIndex={setSelectedOweIndex}
        type="youOwe"
      />
    </div>
  );
}
