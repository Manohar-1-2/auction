const mongoose=require("mongoose")
const Schema=mongoose.Schema
const userSehema=new Schema({
    username:{
        type:String,
        required:true
    },
    role:{
        type:String,
        required:false,
    },
    password:{
        type:String,
        required:true
    },
    joinedAuc:{
        type:Array,
        required:false,
    },
})

const userAuctionSehema=new Schema({
    postedBy:{
        type:String,
        required:true
    },
    itemName:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },

    des:{
        type:String,
        required:true
    },

    joinedUser:{
        type:Array,
        required:false,
    },

    img:{
        type:Buffer,
        required:true
    },
    status:{
        type:String,
        required:false
    },
    winner:{
        type:String,
        required:false
    }

}); 


const AuctionRoomSehema=new Schema({
    postedBy:{
        type:String,
        required:true
    },
    joinedUser:{
        type:String,
        required:true
    }
})

module.exports={"user":mongoose.model("User",userSehema),"userAuction":mongoose.model("UserAuction",userAuctionSehema),"AuctionRoom":mongoose.model("AuctionRoom",AuctionRoomSehema)}
