const router=require("express").Router();
const db=require('../models');
const orm=require('../orm/orm')

var authenticated=false;
var currentUser=""

/* resets authenticated as false so resets user/site experience */
router.get('/auth',(req,res)=>{
    //authenticated=false;
    res.send(authenticated)
})

/* sign-in logic */
router.post('/login',(req,res)=>{
    orm.signIn(req.body.name,req.body.password,function(data){
       
        res.send(data)
        currentUser=req.body.name
    })
})

/* sends currentUser up to Home and passes along as prop to Navbar */
router.get('/currentUser',(req,res)=>{
    res.send(currentUser)
})

/* add new quote and push quoteID into currentUsers comments array */
router.post('/newquote',(req,res)=>{
    db.Comments.create({comment:req.body.quotes, author:currentUser}).then((dbQuote)=>{
        db.Members.findOneAndUpdate({name:currentUser},{$push:{comments:dbQuote._id}}).then(()=>
    console.log("SUccessfullll push!!"))
    res.status(200)
    })
    
})

/*get all quotes and send to Home.js */
router.get('/allquotes',(req,res)=>{
    // orm.allQuotesAllAuthors(function(stuff){
        // console.log(stuff)
        // res.send(stuff)
    // })
    db.Comments.find().then(dbComments=>{
        res.send(dbComments)
    })
})

/* Get quotes only attributed to currentUser */
router.get('/getuserquotes',(req,res)=>{

    orm.quotesFromUser(currentUser,function(data){
   
        res.send(data)
    }) 
})

router.post("/likedcomment",(req,res)=>{
    console.log(req.body.id)
    orm.addLikedQuote(req.body.id,currentUser,function(data){
       // console.log(data)
    })
    res.end()
})

router.get('/quotesyouliked',(req,res)=>{
    orm.quotesUserLiked(currentUser,function(data){
      
        res.send(data)
    })
})

router.post('/like',(req,res)=>{
    orm.likeQuote(req.body.id,function(){
        console.log("success")
        res.end()
    })
})

router.post('/removeQuote',(req,res)=>{
    console.log(req.body.id)
    orm.removeQuote(currentUser,req.body.id,function(data){
       
        res.end()
    })
})

router.get('/getusers',(req,res)=>{
    orm.getUsers(function(data){
       
        res.send(data)
    })
})

router.post("/quoteforsomeone",(req,res)=>{
    console.log(req.body)
    orm.messageToSomeone(req.body.target,req.body.quote,currentUser,function(data){
        console.log(data)
    })
    res.end()
})

router.get('/getlove',(req,res)=>{
    orm.getTheLove(currentUser,function(data){
        
        res.send(data)
    })
})

router.post('/deletecomment',(req,res)=>{
    console.log(req.body.id)
    orm.deleteComment(currentUser,req.body.id,function(data){
        console.log(data)
        res.end()
   })
    
})

module.exports=router;