import { useEffect, useState } from "react"
import TableSelector from "../components/TableSelector.jsx"
import MainPageButton from "../components/MainPageButton.jsx"
import QueryBar from "../components/QueryBar.jsx"
import Tables from "../components/Tables.jsx"

const Home = ()=>{
    const [statusMSG, setStatusMSG] = useState('')
    const [customQuery, setCustomQuery] = useState('');
    const [data, setData] = useState(null);
    const [show, setShow] = useState(false);

    
    useEffect(()=>{

    },[customQuery])

    const handleExecuteSql = () => {
        fetch("/api/sql", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ query: customQuery }),
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
          })
          .catch((error) => console.error("Error executing SQL:", error));
    };

    function submitSQL(){
        handleExecuteSql();
        if(customQuery.toLocaleLowerCase().includes('select')){
            setShow(true)
        }
    }

    return(
        <div style={{
           width: "100%",
           height:"100vh",
           display: 'flex',
           flexDirection: 'column',
           alignItems: 'center',
           backgroundColor: "white"
        }}>
            <h1>
                VIEW TABLES
            </h1>
            <div style={{
                display: "flex",
                justifyContent: "space-evenly",
                width: "100%",
                maxWidth: '1600px'
            }}>
                <TableSelector text = "Companies" link = "company"/>
                <TableSelector text = "Employees" link = "employee"/>
                <TableSelector text = "Timesheets" link = "timesheets"/>
                <TableSelector text = "Benefits" link = "benefits"/>
            </div>
            <div style={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "15px"
            }}>
                <p>{statusMSG}</p>
                <MainPageButton text = 'CREATE TABLES' color='lightgreen' />
                <MainPageButton text = 'POPULATE TABLES' color='yellow'/>
                <MainPageButton text = "DROP TABLES" color = 'salmon' />
                <QueryBar setSQL={setCustomQuery} click={submitSQL}/>
                {(show) && <Tables content={data}/>}
            </div>
        </div>
    )
}
export default Home