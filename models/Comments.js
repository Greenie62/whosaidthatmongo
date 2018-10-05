const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const CommentsSchema=new Schema({
    comment:String,
    author:String,
    likes:Number,
})

const Comments=mongoose.model("Comments",CommentsSchema)

module.exports= Comments;