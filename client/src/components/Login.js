import React, {Component} from "react";
import "../App.css";
import axios from "axios";
import Navbar from "./Navbar/Navbar";

class Login extends Component{
    state={
        name:"",
        password:"",
        error:""
    }


    onStateChange=(event)=>{
        this.setState({[event.target.name]:event.target.value})
        this.setState({error:""})
    }

    onStateSubmit=(event)=>{
        event.preventDefault()
        axios.post('/login',this.state).then((res)=>{
            if(res.data === true){
                this.props.setLogin();
                this.props.history.push('/')
                console.log("cmon bitch!!")
            }
          else{this.setState({error:"Wrong username/password!!"})
        }
        })
    }

    render(){
        return(
            <div>
                <header>
                <div className='headerbanner'>
                <h1 className='who display-4'>WHO</h1>
                <h1 className='said display-4'>SAID</h1>
                <h1 className='that display-4'>THAT</h1>
                </div>
                </header>
             
                <section>
                <form className='username'>
                    <label>Name:
                <input name="name"
                       value={this.state.name}
                       onChange={this.onStateChange}
                       type="text"
                       placeholder="enter_name_here"
                       />
                       </label>
                       </form>
                       <form className='password'>
                    <label>Password:
                <input name="password"
                       value={this.state.password}
                       onChange={this.onStateChange}
                       type="text"
                       placeholder="enter_name_here"/>
                       </label>
                       </form>
                       <button className='btn btn-primary m-2 enterButton' onClick={this.onStateSubmit}>Submit</button>
                      
                       <h2 className='error'>{this.state.error}</h2>
                       </section>
                </div>
        )
    }
}

export default Login;