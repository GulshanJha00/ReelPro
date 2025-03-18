const express = require("express")
const app = express();
const connect = require("../config/db")
const User = require("../schema/UserSchema")
const cookieParser = require("cookie-parser")
const cors = require("cors")
const jwt = require("jsonwebtoken")

app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}))

app.post("/register",async (req,res)=>{
    
    const {email,password} = await req.body;

    if(!email || !password){
        return res.status(404).json({message: "error"})
    }
    await connect();
    try {
        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(404).json({message: "User already exist"})
        }
        const schema = await User.create({
            email,password
        })
        schema.save();
        const token = jwt.sign({
            data: email
          }, 'abc', { expiresIn: '10h' });
          res.cookie("token",token, {
            
                httpOnly: true, 
                secure: false,  
                sameSite: "lax", 
          })
        return res.status(200).json({message: "User saved"})
    } catch (error) {
        return res.status(500).json({message: "User not saved"})
    }
})

module.exports = app