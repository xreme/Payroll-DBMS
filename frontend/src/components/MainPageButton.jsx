const MainPageButton = (props) =>{
    const {text, color} = props;

    const handleClick = () =>{
        console.log("PLEASD");
        console.log(text)
        switch(text){
            case 'CREATE TABLES':
                console.log('1');
                createTables();
                break;
            case 'POPULATE TABLES':
                console.log('2');
                handlePopulateDatabase();
                break;
            case 'DROP TABLES':
                console.log('3');
                handleDropAllTables();
                break;
        }
    }

    const createTables = () => {
        console.log('creating')
        fetch("/api/reinitialize", {
          method: "POST",
        })
          .then((response) => response.json())
          .then((result) => {
            console.log(result.message); // Show success or error message
          })
          .catch((error) => {
            console.error("Error reinitializing database:", error);
        });
    };
    const handlePopulateDatabase = () => {
        fetch("/api/populate", {
          method: "POST",
        })
          .then((response) => response.json())
          .then((result) => {
            console.log(result.message); // Show success or error message
          })
          .catch((error) => {
            console.error("Error populating database:", error);
          });
    };
      const handleDropAllTables = () => {
        fetch("/api/drop_all_tables", {
          method: "DELETE",
        })
          .then((response) => response.json())
          .then((result) => {
            console.log(result.message); // Show success or error message
          })
          .catch((error) => {
            console.error("Error dropping all tables:", error);
          });
    };

    return(
        <button style={{
            backgroundColor:color,
            cursor: 'pointer',
            outline: '2px solid black',
            borderRadius: "10px",
            padding: "10px",
            width: "90%"
        }}
        onClick={handleClick}
        >
            {text}
        </button>
    )

}

export default MainPageButton