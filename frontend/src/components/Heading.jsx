import { Link } from "react-router-dom";
export default function Heading() {
    return (
      <>
        <div class="heading">
          <h2>CPS510 Assignment 9</h2>
          <h3>Demonstration of application using Java/web based UI and Individual Evaluation of the Project</h3>
          <p>Created by: Daniel, Jennifer, Osereme</p> 
          <Link to="/"><h3 className="home-button">RETURN TO HOME PAGE</h3></Link>
        </div>
      </>
    );
}