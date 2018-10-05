import React from "react";
import {Link} from "react-router-dom";
import "./Navbar.css";

function stopThat(){
    console.log("hey there!!")
    document.querySelector(".currentUserNav").addEventListener('click',function(){
        if(this.classList.contains("bounceName")){
            this.classList.remove("bounceName")
        }
        else{this.classList.add("bounceName");}
    })
}

const Navbar= (props) =>{
    return(
        <nav className='navbar navbar-expand-lg navbar-light bg-light'>
        <Link className='navbar-brand' to="/">
       <p className='display-4 currentUserNav bounceName' onClick={()=>stopThat()}> Quote the {props.user}... </p>
        </Link>
        <div>
            <ul className="navbar-nav">
            <li className={window.location.pathname === "/" || 
                           window.location.pathname === "/home"
                        ? "nav-item-active"
                        : "nav-item"
    }
    >
    <Link to="/" className="nav-link">
    Home
    </Link>
    </li>
    <li className={window.location.pathname === "/login"
                   ? "nav-item-active"
                   : "nav-item"
                }
                >
    <Link to="/login" className="nav-link">
    Log-out
    </Link>
    </li>
    <li className={window.location.pathname === "/userquotes"
                  ? "nav-item-active"
                  : "nav-item"}>
    <Link to="/userquotes" className="nav-link">
    Your Quotes
    </Link>
    </li>
    <li className={window.location.pathname === "/sendLove"
                   ? "nav-item-active"
                   : "nav-item"}
                   >
    <Link to="/sendLove" className="nav-link">Spread the Love
    </Link>
    </li>
    <li className={window.location.pathname === "/feellove"
                   ? "nav-item-active"
                   : "nav-item"}
                   >
    <Link to="/feellove" className="nav-link">
    Feel the Love
    </Link>
    </li>
    </ul>
    </div>
        </nav>
    )
}

export default Navbar;