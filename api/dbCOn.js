const mongoose=require('mongoose')
const connectDb= async()=>{
    await mongoose.connect("mongodb+srv://manunimmala124:j6rtgMlPFsa8mwE4@cluster0.6w11cbk.mongodb.net/auctionDb?retryWrites=true&w=majority")
}

mongoose.connection.once("open",()=>{
    console.log("connected to mongoDb")
})


module.exports=connectDb