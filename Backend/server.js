const express = require('express')
const cors  = require("cors")
const dotenv = require('dotenv')
const mongoose  = require('mongoose')
const jwt = require('jsonwebtoken')
const bcryptjs = require('bcryptjs')
const User = require('./models/User')


dotenv.config()
PORT = process.env.PORT || 3000
MONGODB_URL = process.env.MONGODB_URL
const app = express()
app.use(cors())
app.use(express.json())


//connnection
mongoose.connect(MONGODB_URL).then(()=>{
    console.log("connected to database")
}).catch((err)=>{
    console.log("something went wrong "+err)
})

app.post('/signup',async(req,res)=>{
    const {username ,password ,email} = req.body 
    try{
    const hashed = await bcryptjs.hash(password,10)
    const user = new User({username,email,password:hashed});
    await user.save()
    }catch(err){
     res.status(400).json({error:'something went wrong '+err})
    }
})

app.post("/login",async(req,res)=>{
  const {username,password,email} = req.body
  const user = await User.findOne(username ? { username } : { email });
  if (!user) return res.status(400).json({ error: "User not found" });

  const isMatch = await bcryptjs.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

  const token = jwt.sign({ id: user._id, username: user.username }, "secret123", { expiresIn: "1h" });
  res.json({ message: "Login successful", token, username: user.username })
})


app.listen(PORT,()=>{
    console.log(`server is running in http://localhost:${PORT}`)
})