import React, {Component} from "react";
import "../App.css";
import axios from "axios";
import Navbar from "../components/Navbar/Navbar";


class FeelLove extends Component{
    state={
        loaded:false,
        quotesforyou:[],
        currentUser:"",
        noLove:"",
        haOne:"",
        haTwo:"",
        haThree:""
    };

    componentDidMount=()=>{
          axios.get("/getlove").then(dbLove=>{
              this.setState({quotesforyou:dbLove.data.messages})
              axios.get('/currentUser').then(user=>{
                  this.setState({currentUser:user.data,
                                 loaded:true})
              
              console.log(this.state.quotesforyou)
          
          if(this.state.quotesforyou.length === 0){
              this.setState({noLove:"No one loves you!",
                              haOne:"Ha",
                              haTwo:"Ha",
                              haThree:"Ha"})
          }
        })
    })
    }


    deleteComment=(id)=>{
        console.log("ID " + id)
        const removeQuote={};
        removeQuote.id=id;
        axios.post("/deletecomment",removeQuote).then(()=>{
        this.componentDidMount();
        })
    }
    
    render(){
        if(!this.state.loaded){
            return "waiting for that shit!"
        }
        return(
            <div>
                <Navbar user={this.state.currentUser}/>
                 {this.state.quotesforyou.map(q=>
                 <h3 key={q._id} className="listedQuotes p-1"> {q.author}<br/> By {q.message} 
                  <button className='btn btn-secondary text-light' onClick={()=>this.deleteComment(q._id)}>I dont like this!</button></h3>)} 
               <h3 className="display-4 listedQuotes">{this.state.noLove}</h3>
               <h3 className='display-4'><span className='haOne'>{this.state.haOne}</span><span className='haTwo'>{this.state.haTwo}</span><span className='haThree'>{this.state.haThree}</span></h3>
                </div>
        )
    }
}

export default FeelLove;