import React, {Component} from "react";
import "./App.css";
import {BrowserRouter as Router, Route, Switch, Redirect} from "react-router-dom";
import axios from "axios";
import Login from "./components/Login.js";
import Home from "./pages/Home.js"
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import UserPage from "./pages/UserPage"
import SendLove from "./pages/SendLove"
import FeelLove from "./pages/FeelLove"


class App extends Component{
  state={
    authenticated:false,
    loaded:false,
    currentUser:""
  }

  componentDidMount=()=>{
    axios.get('/auth').then((res)=>{
    this.setState({loaded:true,
                   authenticated:res.data})
    })
    axios.get('/userquotes')
  }

  setLogin=()=>{
  
    this.setState({authenticated:true})
  
  }

  render(){
    if(!this.state.loaded){
    return( <h1>Page not loaded yet! </h1> )
    }
    return(
      
    
      <Router>
        <div>
       
        <Switch>
          <Route exact path="/login" render={(props)=> <Login {...props} setLogin={this.setLogin}/>}/>
          {!this.state.authenticated ? <Redirect to="/login"/>: null}
          <Route exact path="/" component={Home}/>
          <Route exact path="/userquotes" component={UserPage}/>
          <Route exact path="/sendLove" component={SendLove}/>
          <Route exact path="/feellove" component={FeelLove}/>
          </Switch>
          <Footer/>
          </div>
          </Router>
    )
  }
}

export default App;