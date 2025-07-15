import { useState } from "react";
import "../../styles/Table.css";

export default function ExpenseTable({ expenses, selectedId, setSelectedId }) {
  const [sortBy, setSortBy] = useState("date");
  const [sortDirection, setSortDirection] = useState("asc");

  const handleSort = (column) => {
    if (sortBy === column) {
      setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortBy(column);
      setSortDirection("asc");
    }
  };

  const sortedExpenses = [...expenses].sort((a, b) => {
    let aVal = a[sortBy];
    let bVal = b[sortBy];

    if (sortBy === "date") {
      aVal = new Date(aVal);
      bVal = new Date(bVal);
    } else if (sortBy === "value") {
      aVal = Number(aVal);
      bVal = Number(bVal);
    }

    if (aVal < bVal) return sortDirection === "asc" ? -1 : 1;
    if (aVal > bVal) return sortDirection === "asc" ? 1 : -1;
    return 0;
  });

  const sortArrow = (column) => {
    if (sortBy !== column) return "";
    return sortDirection === "asc" ? " ↑" : " ↓";
  };

  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th onClick={() => handleSort("date")}>Date{sortArrow("date")}</th>
            <th>Description</th>
            <th onClick={() => handleSort("category")}>
              Category{sortArrow("category")}
            </th>
            <th onClick={() => handleSort("value")}>
              Value{sortArrow("value")}
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedExpenses.map((e) => (
            <tr
              key={e.id}
              style={{ background: selectedId === e.id ? "#eeeeff" : "" }}
              onClick={() => setSelectedId(e.id)}
            >
              <td>{e.date}</td>
              <td>{e.description}</td>
              <td>{e.category}</td>
              <td>{Number(e.value).toFixed(2)}€</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
