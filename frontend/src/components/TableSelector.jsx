import { useState } from "react";
import {Link} from "react-router-dom";
const TableSelector = (props) =>{
    const {text, link} = props
    const [isHovered, setIsHovered] = useState(false);
    return(
        <>
            <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: "15vw",
                height: '15vw',
                maxWidth: '300px',
                maxHeight: '300px',
                minWidth: '100px',
                backgroundColor: "lightblue",
                borderRadius: "10px",
                outline: `2px solid ${isHovered ? 'yellow' : 'black'}`,
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
                <h3>
                    <Link to = {`/table/${link}`} >
                     {text}
                    </Link>
                </h3>
            </div>
        </>
    )
}
export default TableSelector