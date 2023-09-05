const express=require("express")
const path=require('path')
const cors=require("cors")
const http=require("http")
const connectDb=require("./dbCOn")
const mongoose=require("mongoose")
const {user,userAuction,AuctionRoom}=require("./user")
const jwt=require("jsonwebtoken")
const multer=require("multer")
require("dotenv").config()
const {serverEventEmitter,startCountdown,resetCountdown}=require('./countDown')
const app=express()
connectDb()
const server=http.createServer(app)
const startingBidAmount=100
let currentHighestBidder=[]
const {Server}=require("socket.io")
app.use(cors())

app.use(express.json({ limit: '10mb' }));
const io=new Server(server,{
    cors:{
        origin:"http://localhost:5173",
        methods:["GET","POST"]
    }
})
io.on("connection",(socket)=>{
    console.log(`user connection :${socket}`)
    socket.on("mess",(mess)=>{
        console.log(`${socket.id} sends : ${mess} `)
        io.emit('recive',mess)
    })

    socket.on("start",()=>{
        io.emit("startAuction",startingBidAmount,()=>{console.log("auction started")})
        startCountdown()

        serverEventEmitter.on("timeRanOut",()=>{
            io.emit("auctionEnd",socket.id)
            console.log("timeout")
        })
    })

    socket.on("bid",(bidAmount)=>{
        console.log(`bid is placed by user ${socket.id}:${bidAmount}`)
        currentHighestBidder=[socket.id,bidAmount]
        resetCountdown()
        io.emit("resetTimer")
        io.emit("placedBid",socket.id,bidAmount)
    })
})
const createUser= async(username,pass)=>{
    const result=await user.create({
        'username':username,
        'password':pass
    })

    console.log(result)
}
const validateUser= async(req,res,next)=>{
    const user= await User.findOne({username:req.body.username})
    if(!user){console.log("user not found");return}
    if(user.password==req.body.password){
        console.log("password Matched...")
    }else{console.log("password Wrong");return}
    next()
}

app.get("/",(req,res)=>{

    res.json({hi:"server data"})
})
const invalidatedTokens = new Set();
app.post("/login",async(req,res)=>{
    const founduser= await user.findOne({username:req.body.username}).exec()
    if(!founduser){console.log("user not found");return}
    if(founduser.password==req.body.password){
        console.log("password Matched...")
    }else{console.log("password Wrong");return}


    const {username}=req.body
    const acessTok=jwt.sign({username},process.env.ACESS_TOK)
    res.json({ acessTok,username});
    console.log(acessTok)

})

app.post("/logout",(req,res)=>{
    const token = req.headers.authorization
    invalidatedTokens.add(token);
    res.status(200).json({mess:"Sucessfully logout"})
})
const verify=(req,res,next)=>{

    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({ message: 'Access token not provided' });
    }
    if (invalidatedTokens.has(token)){
        return res.status(403).json({ message: 'Invalid token' });
    }
    try {
      const decoded = jwt.verify(token.split(" ")[1], process.env.ACESS_TOK);
      req.user = decoded;
      next();
    } catch (error) {
      return res.status(403).json({ message: 'Invalid token' });
    }

}

const createAuction= async(itemName,price,des,file,postedBy,req,res)=>{
    try{
        const newAuction=await userAuction.create({
            postedBy,
            itemName,
            price,
            des,
            "img":file
    
        })
    }
    catch(err){
        console.log(err)
        res.status(401).json({message:"Invalid data"})

    }

}


const storage = multer.memoryStorage()
const upload = multer({
    storage: storage,
  });

app.post("/posts",verify,upload.single('file'),(req,res)=>{
    const {itemname,price,des}=req.body
    createAuction(itemname,price,des,req.file.buffer,req.user.username,req,res)
    return res.status(200).json({message:"Sucessfully created"})
})
app.get("/getmyauc",verify,async(req,res)=>{
    const foundedAuc=await userAuction.find({postedBy:req.user.username})
    if(foundedAuc.length==0){
        res.status(204).json({mess:"You Don't have any auctions"})
    }
    else{
        res.json(foundedAuc)
    }
})
app.get("/auctionlist",verify,async(req,res)=>{
    const foundedAuc=await userAuction.find({postedBy:{$ne:req.user.username}})

    res.status(200).json(foundedAuc)
}) 

app.post("/joinauc",verify,async(req,res)=>{
    const aucid=req.body.id
    const foundedAuc=await userAuction.findById(aucid)
    const joined=foundedAuc.joinedUser
    for(let i=0;i<joined.length;i++){
        if(joined[i]==req.user.username){
            res.status(202).json({mess:"You alredy joined"})
            return
        }
    }
    foundedAuc.joinedUser.push(req.user.username)
    const result = await userAuction.findByIdAndUpdate({ _id:aucid },{
        $set: {
            joinedUser:foundedAuc.joinedUser
        },
      });
    res.status(200).json({mess:"sucessfully joined"})
})

mongoose.connection.once("open",()=>{
    console.log("Connected to mongoDb")
    app.listen(3002,()=>{console.log("running on port 3002")})

})

server.listen(3001,()=>{console.log("server running on port 3001")})