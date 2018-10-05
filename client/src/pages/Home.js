import React, {Component} from "react";
import "../App.css";
import axios from "axios"
import Navbar from "../components/Navbar/Navbar"

var quotes=[]

class Home extends Component{
    state={
        quotes:"",
        allquotes:[],
        loaded:false,
        currentUser:""
    }

    componentDidMount=()=>{
        axios.get('/allquotes').then((dbQuotes)=>{
        this.setState({allquotes:dbQuotes.data,
                       loaded:true})
                       console.log(this.state.allquotes)
      
                      
        
        axios.get('/currentUser').then(dbName=>{
           
            this.setState({currentUser:dbName.data})
            console.log("CU: " +this.state.currentUser)
        })
    })
    }

    onStateChange=(event)=>{
        this.setState({[event.target.name]:event.target.value})
        this.setState({error:""})
    }

    enterQuote=(event)=>{
        event.preventDefault();
        if(this.state.quotes === "" || this.state.quotes.length < 2){
            this.setState({error:"Thats not a quote, thats a brain fart!!"})
        }
        else{
        axios.post('/newquote',this.state)

        axios.get('/allquotes').then((dbQuotes)=>{
            this.setState({allquotes:dbQuotes.data})
            this.setState({quotes:""})
        })
    }
    }

    grabQuote=(id)=>{
        var likedquote={};
        likedquote.id=id;
        axios.post('/likedcomment',likedquote).then(()=>{
       
        })
        
    }

    likeQuote=(id)=>{
    console.log(id)
    var likedquote={};
    likedquote.id=id;
    axios.post("/like",likedquote)
    this.componentDidMount()
    }

    render(){
        if(!this.state.loaded){
            return <h1>Still waiting on shit!! </h1>
        }
        return(
            <div>
                <Navbar user={this.state.currentUser}/>
                <form className='text-center p-2'>
                    <label><h5>Quote</h5>
                <input name="quotes"
                       value={this.state.quotes}
                       onChange={this.onStateChange}
                       type="text"
                       placeholder="enter_quote_here"/>
                       </label>
                       
                     <button className={this.btnMethod()} onClick={this.enterQuote}>Enter</button>
                       {this.state.error}
                       </form>
                       <ul>
                            {this.state.allquotes.map(quote=> 
                          <h4 className='listedQuotes display-4 text-light p-3' key={quote._id}>{quote.comment} By: {quote.author}  <button className='btn btn-success btn-sm' id={quote._id} onClick={()=>this.grabQuote(quote._id)}>Grab</button>
                          <button className="btn btn-primary text-light" onClick={()=>this.likeQuote(quote._id)}>Like</button><div className="badge m-2 badge-danger">Likes:{quote.likes}</div></h4>)} 
                        </ul>
                    
                </div>
        )
    }
    btnMethod(){
        let btnClass='btn m-2 btn-'
        return btnClass += this.state.quotes.length > 3 ? "danger" : "success";
    }
}

export default Home;