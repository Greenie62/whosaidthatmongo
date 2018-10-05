import React,{Component} from "react";
import axios from "axios";
import Navbar from "../components/Navbar/Navbar"
import "../App.css";


class SendLove extends Component{
    state={
        users:[],
        loaded:false,
        currentUser:"",
        personOfInterest:"",
        message:""
    }

    componentDidMount=()=>{
        axios.get('/getusers').then(dbUsers=>{
            this.setState({users:dbUsers.data,
                           loaded:true})
                           console.log(dbUsers)
        
        axios.get('/currentUser').then(dbUser=>{
            this.setState({currentUser:dbUser.data})
        })
    })
    }

    personComment=(event)=>{
        event.preventDefault()
        var person=document.getElementById("targetuser").value;
        console.log(document.getElementById('targetuser').value);
        this.setState({personOfInterest:person})
        document.getElementsByClassName("model")[0].style.display="block"
    }

    closeWindow=()=>{
        document.getElementsByClassName('model')[0].style.display="none";
        this.componentDidMount()
    }

    sendQuote=()=>{
        console.log("something")
        var quote={}
        quote.quote=document.getElementsByClassName('quoteArea')[0].value
        quote.target=document.getElementById("targetuser").value;
        console.log(quote);
        axios.post("/quoteforsomeone",quote)
        document.getElementsByClassName('model')[0].style.display="none";
      document.getElementById('targetuser').value="";
       
    }

    measureQuote=(event)=>{
        this.setState({[event.target.name]:event.target.value})
    }

    render(){
       
        
        if(!this.state.loaded){
            return null;
        }
        return(
            <div>
                <Navbar user={this.state.currentUser}/>
                <form className='text-center p-2'>
                    <label>
                        <h5>To who...</h5>
                <input list='nameList'
                        key='nameList'
                         id='targetuser'
                         />
                         </label>
                         <button className='btn btn-primary text-light' onClick={this.personComment}>To them!</button>

                         </form>

                        <datalist id='nameList'>
                        {this.state.users.map(user=>
                         <option value={user} key={user}/>)}
                         </datalist> 
                         
 <div className='model'> 
  <div className='model-header'>
<h2>Send some love to {this.state.personOfInterest} <span className='closeIt' onClick={this.closeWindow}>&times;</span></h2>
<div className='model-content'>
<h2>Hey we got our snazzy lil modal! </h2>
<textarea className='quoteArea' onChange={this.measureQuote} name="message" value={this.state.message}></textarea>
<button className={this.btnMethod()} onClick={this.sendQuote}>Send</button>
<div className='footer'>
<p>Copywrite Modal .inc </p>
</div>
</div>
 </div> 
  </div> 

                         
                
                </div>
        )
    }

    btnMethod() {
        let btnClass = "btn m-2 btn-";
        return btnClass += this.state.message.length < 2 ? "danger" : "success";
    }
}

export default SendLove;