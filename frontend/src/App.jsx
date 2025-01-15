import './App.css';
import React from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom"
import Heading from "./components/Heading";
import Tables from './components/Tables';
import './styles/components/Tables.css';
import './styles/components/QueryBar.css';
import Home from './pages/Home';
import ViewTables from './pages/ViewTables'

function App() {

  const company = ["Google", "Amazon", "Meta", "Tesla"];
  const employee = ["Jane", "John", "Bob", "Emma"];

  return (
    <BrowserRouter>
      <Heading/>
      <div className="App">
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/table/:view' element={<ViewTables/>} />
        </Routes>

        {/* <div className="filter">
          <button class="add-table" type="button">Add a New Table!</button>
        </div> */}
{/* 
        <Tables name="COMPANY" content={company}/>
        <Tables name="EMPLOYEE" content={employee}/> */}

      </div>
    
    </BrowserRouter>
  );
}

export default App;
