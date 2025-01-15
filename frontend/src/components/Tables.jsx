import { useEffect, useState } from "react";

export default function Tables({name, content}) {
  const [data, setData] = useState(null)
  
  console.log(content)


  useEffect(()=>{
    if (!content){
      fetch(`/api/data?table_name=${name}`, {
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
        })
        .catch((error) => console.error("Error fetching data:", error))
    }
  },[])
  useEffect(()=>{
    if(content){
      setData(content)   
    }
  },[content])

  useEffect(()=>{
    console.log(data)
  },[data])
  
  const renderTable = () => {
    if (!data || data.length === 0) {
      return <p>No Records Found 😡</p>;
    }
    if (!data[0]){
      return <p>No Records Found 😡</p>;
    }
    const headers = Object.keys(data[0]);
    const fontSize = name === 'Employee' ? '11px' : '16px';

    return (
      <table style={{ width: '100%', borderCollapse: 'collapse', tableLayout: 'fixed' }}>
        <thead style={{fontSize}}>
          <tr>
            {headers.map((header) => (
              <th key={header}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody style={{ width: '100%', borderCollapse: 'collapse', tableLayout: 'fixed' }}>
          {data.map((item) => (
            <tr key={item.id}>
              {headers.map((header) => (
                <td key={header}  style={{padding: '8px', textAlign:'center', fontSize }}>{item[header]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  const dropTable=()=>{
    fetch("/api/table", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ table_name: name }),
    })
      .then((response) => response.json())
      .then(() => {
        console.log(`Table ${name} dropped successfully!`);
        setData([]);
      })
      .catch((error) => console.error("Error dropping table:", error));
  }

  return (
    <>
      <div className="table">
          <div className="table-heading">
          <h2>{name}</h2>
          </div>
          <div className="content">
            {data ? renderTable() : <p>TABLE DOES NOT EXIST 👎</p>}
          </div>
          <div className="query-section">
          <button onClick={dropTable}>DROP TABLE</button>
          <form>
            <label className="query-label"><b>QUERY TABLE:</b></label>
            <input type="text" className="query-input"/>
          </form>
          </div>
      </div>
    </>
  );
}