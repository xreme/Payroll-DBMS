export default function QueryBar(props) {
    const {setSQL, click} = props
    const handleInputChange = (event) => {
        setSQL(event.target.value);
    }; 
    return(
        <div className="queryBar">
            <label className="queryBar-label">QUERY TABLE</label>
            <div className="query-input-button">
                <textarea className="queryBar-input" onChange={handleInputChange}/>
                <button className="queryBar-button" type="button" onClick={click}>GO</button>    
            </div>
        </div>
    );
}