import "./DataBackupPage.css";
import FileUploadButton from "../components/FileUploadButton";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../routes.js";

function loadData() {
  const debts = JSON.parse(localStorage.getItem("debts") || "[]");
  const expenses = JSON.parse(localStorage.getItem("expenses") || "[]");
  return { version: "1.0.0", debts, expenses };
}

function saveData(data) {
  if (data.debts) {
    localStorage.setItem("debts", JSON.stringify(data.debts));
  }
  if (data.expenses) {
    localStorage.setItem("expenses", JSON.stringify(data.expenses));
  }
}

export default function DataBackup() {
  const navigate = useNavigate();

  const handleExport = () => {
    const data = loadData();
    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `expenses_backup_${timestamp}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = (e) => {
    const fileReader = new FileReader();
    fileReader.onload = (event) => {
      try {
        const data = JSON.parse(event.target.result);
        const confirmed = window.confirm(
          `Preview:\n\nDebts: ${data.debts?.length || 0} items\nExpenses: ${
            data.expenses?.length || 0
          } items\n\nDo you want to import this data?`
        );

        if (confirmed) {
          saveData(data);
          alert("Data imported successfully!");
          navigate(ROUTES.HOME);
        }
      } catch (err) {
        alert("Invalid JSON file.");
      }
    };

    if (e.target.files[0]) {
      fileReader.readAsText(e.target.files[0]);
    }
  };

  return (
    <div className="backup-container">
      <label>
        Export Data:
        <button onClick={handleExport}>Download File</button>
      </label>
      <label>
        Import Data:
        <FileUploadButton onChange={handleImport} accept="application/json" />
      </label>
    </div>
  );
}
