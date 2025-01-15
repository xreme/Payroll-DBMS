import React, { useState } from "react";

function App() {
  const [data, setData] = useState([]); // Data to display (from table or SQL)
  const [tableNameForFetch, setTableNameForFetch] = useState(""); // Table name for fetching data
  const [tableNameForAdd, setTableNameForAdd] = useState(""); // Table name for adding data
  const [tableNameForDrop, setTableNameForDrop] = useState(""); // Table name for dropping
  const [fieldEntries, setFieldEntries] = useState([{ field: "", value: "" }]); // Fields for dynamic form
  const [rawSql, setRawSql] = useState(""); // Raw SQL input
  const [source, setSource] = useState(""); // Source of the data (Table Name or Raw SQL)
  const [message, setMessage] = useState(""); // Message for success or error

  // Fetch data
  const fetchData = (e) => {
    e.preventDefault();
    fetch(`/api/data?table_name=${tableNameForFetch}`, {
      method: "GET",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Error fetching data: ${response.statusText}`);
        }
        return response.json();
      })
      .then((data) => {
        setData(data);
        setSource(`Table: ${tableNameForFetch}`);
      })
      .catch((error) => console.error("Error fetching data:", error));
  };

  // Add data
  const handleAddData = (e) => {
    e.preventDefault();
    const fields = fieldEntries.reduce((acc, entry) => {
      if (entry.field && entry.value) {
        acc[entry.field] = entry.value;
      }
      return acc;
    }, {});

    fetch("/api/data", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ table_name: tableNameForAdd, fields }),
    })
      .then((response) => response.json())
      .then(() => {
        console.log("Data added successfully!");
        setFieldEntries([{ field: "", value: "" }]); // Reset form
      })
      .catch((error) => console.error("Error adding data:", error));
  };

  // Drop table
  const handleDropTable = (e) => {
    e.preventDefault();
    fetch("/api/table", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ table_name: tableNameForDrop }),
    })
      .then((response) => response.json())
      .then(() => {
        console.log(`Table ${tableNameForDrop} dropped successfully!`);
        setTableNameForDrop("");
      })
      .catch((error) => console.error("Error dropping table:", error));
  };

  // Drop all tables
  const handleDropAllTables = () => {
    fetch("/api/drop_all_tables", {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((result) => {
        setMessage(result.message); // Show success or error message
      })
      .catch((error) => {
        setMessage("Error dropping all tables");
        console.error("Error dropping all tables:", error);
      });
  };

  // Execute raw SQL
  const handleExecuteSql = (e) => {
    e.preventDefault();
    fetch("/api/sql", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query: rawSql }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error executing SQL query");
        }
        return response.json();
      })
      .then((result) => {
        console.log("SQL executed successfully!");
        setData(result); // Display result in data section
        setSource("Raw SQL Query");
      })
      .catch((error) => console.error("Error executing SQL:", error));
  };

  // Add a new field dynamically
  const addField = () => {
    setFieldEntries([...fieldEntries, { field: "", value: "" }]);
  };

  const handleFieldChange = (index, key, value) => {
    const updatedFields = [...fieldEntries];
    updatedFields[index][key] = value;
    setFieldEntries(updatedFields);
  };

  // Handle database population
  const handlePopulateDatabase = () => {
    fetch("/api/populate", {
      method: "POST",
    })
      .then((response) => response.json())
      .then((result) => {
        setMessage(result.message); // Show success or error message
      })
      .catch((error) => {
        setMessage("Error populating database");
        console.error("Error populating database:", error);
      });
  };

  // Handle database reinitialization
  const handleReinitializeDatabase = () => {
    fetch("/api/reinitialize", {
      method: "POST",
    })
      .then((response) => response.json())
      .then((result) => {
        setMessage(result.message); // Show success or error message
      })
      .catch((error) => {
        setMessage("Error reinitializing database");
        console.error("Error reinitializing database:", error);
      });
  };

  return (
    <div>
      <h1>Database Management</h1>

      {/* Fetch Data */}
      <form onSubmit={fetchData}>
        <h2>Fetch Data</h2>
        <input
          type="text"
          placeholder="Table Name"
          value={tableNameForFetch}
          onChange={(e) => setTableNameForFetch(e.target.value)}
          required
        />
        <button type="submit">Fetch Data</button>
      </form>

      {/* Add Data */}
      <form onSubmit={handleAddData}>
        <h2>Add Data</h2>
        <input
          type="text"
          placeholder="Table Name"
          value={tableNameForAdd}
          onChange={(e) => setTableNameForAdd(e.target.value)}
          required
        />
        {fieldEntries.map((entry, index) => (
          <div key={index}>
            <input
              type="text"
              placeholder="Field Name"
              value={entry.field}
              onChange={(e) =>
                handleFieldChange(index, "field", e.target.value)
              }
              required
            />
            <input
              type="text"
              placeholder="Value"
              value={entry.value}
              onChange={(e) =>
                handleFieldChange(index, "value", e.target.value)
              }
              required
            />
          </div>
        ))}
        <button type="button" onClick={addField}>
          Add More Fields
        </button>
        <button type="submit">Submit Data</button>
      </form>

      {/* Drop Table */}
      <form onSubmit={handleDropTable}>
        <h2>Drop Table</h2>
        <input
          type="text"
          placeholder="Table Name"
          value={tableNameForDrop}
          onChange={(e) => setTableNameForDrop(e.target.value)}
          required
        />
        <button type="submit">Drop Table</button>
      </form>

      {/* Drop All Tables */}
      <button onClick={handleDropAllTables}>Drop All Tables</button>

      {/* Execute Raw SQL */}
      <form onSubmit={handleExecuteSql}>
        <h2>Execute Raw SQL</h2>
        <textarea
          placeholder="Enter your SQL query"
          value={rawSql}
          onChange={(e) => setRawSql(e.target.value)}
          rows={4}
          required
        />
        <button type="submit">Execute SQL</button>
      </form>

      {/* Populate Database Button */}
      <button onClick={handlePopulateDatabase}>Populate Database with Dummy Data</button>

      {/* Reinitialize Database Button */}
      <button onClick={handleReinitializeDatabase}>Reinitialize Database</button>

      {/* Display Data */}
      <h3>{source}</h3>
      <ul>
        {data.map((item, idx) => (
          <li key={idx}>
            {Object.entries(item).map(([key, value]) => (
              <span key={key}>
                {key}: {value} |{" "}
              </span>
            ))}
          </li>
        ))}
      </ul>

      {/* Message */}
      {message && <p>{message}</p>}
    </div>
  );
}

export default App;