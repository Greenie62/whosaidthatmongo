const db=require("../models");


const orm={
  
    signIn:function(name,password,cb){
        var names=[];
        db.Members.find().then(dbMembers=>{
        for(var i=0;i<dbMembers.length;i++){
            names.push(dbMembers[i].name)
        }
        if(names.indexOf(name) === -1){
            db.Members.create({name:name,password:password}).then(()=>{
                cb(true)
            })
        }
        else{
            db.Members.findOne({name:name}).then(dbData=>{
            if(password === dbData.password){
                cb(true)
            }
        else{cb(false)}})
        }
        })
       
    },

    quotesFromUser:function(user,cb){
        db.Members.findOne({name:user}).populate("comments").then((dbQuotes)=>{
            console.log(dbQuotes)
            cb(dbQuotes.comments)
        })
    },

    allQuotesAllAuthors:function(cb){
        var names=[];
        
         db.Members.find().then(dbMembers=>{
             for(var i=0;i<dbMembers.length;i++){
                  names.push(dbMembers[i].name)
             }
        for(var i=0;i<names.length;i++){
            db.Members.findOne({name:names[i]}).populate("comments").then(dbComments=>{
                cb(dbComments)
            })
        }
        })
    },

    addLikedQuote:function(id,currentUser,cb){
        db.Members.findOneAndUpdate({name:currentUser},{$push:{likedComments:id}}).then(()=>{
            cb("Success quote added!")
        })
    },


    quotesUserLiked:function(user,cb){
        db.Members.findOne({name:user}).populate("likedComments").then(dbQuotes=>{
            cb(dbQuotes)
           
        })
    },

    likeQuote:function(id,cb){
        db.Comments.findOneAndUpdate({_id:id},{$inc:{likes:1}}).then(()=>{
            cb()
        })
    },

    removeQuote:function(user,quoteid){
    //if its quote user liked then it should just remove id from their populate array
    // if its a quote user made themself then delete the quote itself
    db.Members.findOneAndUpdate({name:user},{$pull:{comments:quoteid}}).then(()=>{
        console.log("im on the orm page")
    })
    },

    getUsers:function(cb){
        var users=[];
        db.Members.find().then(dbUsers=>{
            for(var i=0;i<dbUsers.length;i++){
                users.push(dbUsers[i].name)
            }
            cb(users)
        })
    },

    messageToSomeone:function(recipient,sender,message,cb){
          db.Messages.create({
              message:message,
              author:sender,
          }).then(dbQuote=>{
              db.Members.findOneAndUpdate({name:recipient},{$push:{messages:dbQuote._id}}).then(()=>{
                  cb("success")
              }).catch(()=>{cb("error")})
          })
    },

    getTheLove:function(user,cb){
        db.Members.findOne({name:user}).populate("messages").then(dbMessages=>{
            cb(dbMessages)
        })
    },


    deleteComment:function(user,quoteid,cb){
        //if its quote user liked then it should just remove id from their populate array
        // if its a quote user made themself then delete the quote itself
        db.Members.findOneAndUpdate({name:user},{$pull:{messages:quoteid}}).then(()=>{
            cb("success")
        })
        },
}

module.exports=orm;