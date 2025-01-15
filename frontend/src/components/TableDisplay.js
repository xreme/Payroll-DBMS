import { useState,useEffect } from "react";

const TableDisplay = (props) => {
    const {tableName, foreignKey} = props;
    const [customQuery, setCustomeQuery] = useState(null);
    const [data, setData] = useState(null);


    // do some data fetching 
    useEffect(()=>{
        if (customQuery){
            // get data based on custom query
        }
        else{
            // fetch data based on the FKID – if applicable
        }
    },[customQuery])

    return(
        <>
            <div style={{
                outline:"2px solid black",
                width:"80%"
            }}>
                <h1>
                   {tableName} TABLE
                </h1>


                <input style={{
                    margin: "5px",
                    width:"80%"
                }}/>
            </div>
        </>
    )
}

export default TableDisplay;