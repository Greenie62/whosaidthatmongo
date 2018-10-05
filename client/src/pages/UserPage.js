import React, {Component} from "react";
import Navbar from "../components/Navbar/Navbar.js";
import "../App.css";
import "../components/Navbar/Navbar.css";
import axios from "axios";


class UserPage extends Component{
    state={
        userQuotes:[],
        loaded:false,
        currentUser:"",
        quotesUserLiked:[],
    };

    componentDidMount=()=>{
        axios.get('/getuserquotes').then(dbData=>{
        this.setState({userQuotes:dbData.data})
        axios.get('/quotesyouliked').then(dbquotes=>{
            this.setState({quotesUserLiked:dbquotes.data.likedComments})
        
            console.log(this.state.quotesUserLiked)
                   
        axios.get("/currentUser").then(dbUser=>{
            this.setState({currentUser:dbUser.data,
                           loaded:true})
        })
    })
    })
    }

    removeIt=(id)=>{
        console.log("ID " + id)
        const removeQuote={};
        removeQuote.id=id;
        axios.post("/removeQuote",removeQuote)
        this.componentDidMount();
    }


    render(){
        if(!this.state.loaded){
            return <h3> waiting for data </h3>
        }
        return(
            <div>
            <Navbar className='bounceName' user={this.state.currentUser}/>
            <div>
            <h2>Your own pearls of wisdom... </h2>
            {this.state.userQuotes.map(q=>
            <h5 className='listedQuotes display-4' key={q._id}>{q.comment}
            <button className='btn btn-danger m-2' onClick={()=>this.removeIt(q._id)}>Remove</button></h5>)}
            <h2>Quotes you like...</h2>
            {this.state.quotesUserLiked.map(q=>
            <h5 className='listedQuotes display-4' key={q._id}>{q.comment} By: {q.author}</h5>)}
            </div>
                </div>
            
        )
    }
}

export default UserPage