import { useNavigate } from "react-router-dom";
import { useDebts } from "../../contexts/DebtsContext";
import "../../styles/Toolbar.css";
import { ROUTES } from "../../routes.js";

export default function DebtToolbar({ selectedIndex, setSelectedIndex, type }) {
  const navigate = useNavigate();
  const { removeDebt, youAreOwed, youOwe } = useDebts();

  const handleAdd = () => {
    navigate(ROUTES.DEBTS_FORM, {
      state: {
        initialDebt: { description: "", person: "", value: "", type },
        index: null,
        type,
      },
    });
  };

  const handleEdit = () => {
    if (selectedIndex !== null) {
      const selectedDebt =
        type === "owedToYou"
          ? youAreOwed[selectedIndex]
          : youOwe[selectedIndex];

      navigate(ROUTES.DEBTS_FORM, {
        state: {
          initialDebt: selectedDebt,
          index: selectedIndex,
          type,
        },
      });
    }
  };

  const handleRemove = () => {
    if (selectedIndex !== null) {
      removeDebt(type, selectedIndex);
      setSelectedIndex(null);
    }
  };

  return (
    <div className="toolbar">
      <button onClick={handleAdd}>Add</button>
      <button
        className="btn-danger"
        onClick={handleRemove}
        disabled={selectedIndex === null}
      >
        Remove
      </button>
      <button onClick={handleEdit} disabled={selectedIndex === null}>
        Edit
      </button>
    </div>
  );
}
