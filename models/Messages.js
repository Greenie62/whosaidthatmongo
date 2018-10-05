const mongoose=require('mongoose');

const Schema=mongoose.Schema;

const messagesSchema=new Schema({
    message:String,
    author:String,
})

const Messages=mongoose.model("Messages",messagesSchema);

module.exports=Messages;