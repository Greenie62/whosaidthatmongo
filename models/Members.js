const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const MemberSchema=new Schema({
    name:String,
    password:String,
    lastname:String,
    age:Number,
    /*all the quotedIds in this users comments array will pull out the comments belonging
      to those IDs from the comments collection */
    comments:[
        {
            type:Schema.Types.ObjectId,
            ref:"Comments"
        }
    ],
    likedComments:[
        {
            type:Schema.Types.ObjectId,
            ref:"Comments"
        }
    ],
    messages:[
        {
            type:Schema.Types.ObjectId,
            ref:"Messages"
        }
    ]
})

const Members=mongoose.model("Members",MemberSchema)

module.exports=Members;