import "../../styles/Table.css";

export default function DebtTable({
  debts,
  selectedIndex,
  setSelectedIndex,
  type,
}) {
  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>Description</th>
            <th>{type === "owedToYou" ? "From Whom" : "To Whom"}</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          {debts.map((debt, i) => (
            <tr
              key={i}
              style={{ background: selectedIndex === i ? "#eeeeff" : "" }}
              onClick={() => setSelectedIndex(i)}
            >
              <td>{debt.description}</td>
              <td>{debt.person}</td>
              <td>{Number(debt.value).toFixed(2)}€</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
