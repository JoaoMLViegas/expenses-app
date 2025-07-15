import { useDebts } from "../contexts/DebtsContext";
import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import { ROUTES } from "../routes.js";

export default function DebtsFormPage() {
  const navigate = useNavigate();
  const { state } = useLocation();

  const { addDebt, editDebt } = useDebts();

  const { initialDebt, index, type } = state || {};
  const isEdit = index !== null;

  const [debt, setDebt] = useState(
    initialDebt
      ? { ...initialDebt, type: type || "owedToYou" }
      : {
          description: "",
          person: "",
          value: "",
          type: "owedToYou",
        }
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDebt((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const filledDebt = { ...debt, type: debt.type || type || "owedToYou" };
    if (isEdit) {
      editDebt(filledDebt, index, filledDebt.type);
    } else {
      addDebt(filledDebt);
    }
    navigate(ROUTES.DEBTS);
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <label>
          Description:
          <input
            name="description"
            value={debt.description}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Person:
          <input
            name="person"
            value={debt.person}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Value:
          <input
            type="number"
            name="value"
            value={debt.value}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Type:
          <select name="type" value={debt.type} onChange={handleChange}>
            <option value="owedToYou">Owed To You</option>
            <option value="youOwe">You Owe</option>
          </select>
        </label>
        <button type="submit">{isEdit ? "Save Changes" : "Add Debt"}</button>
      </form>
    </div>
  );
}
