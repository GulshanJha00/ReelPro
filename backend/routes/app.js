const express = require("express")
const app = express();
const connect = require("../config/db")
const User = require("../schema/UserSchema")
const cookieParser = require("cookie-parser")

app.use(express.json())
app.use(cookieParser())

app.post("/register",async (req,res)=>{
    
    const {email,password} = await req.body;

    if(!email | !password){
        res.status(404).json({message: "error"})
    }
    await connect();
    try {
        const existingUser = await User.findOne({email});
        if(existingUser){
            res.status(404).json({message: "User already exist"})
        }
        const schema = await User.create({
            email,password
        })
        schema.save();
        const jwt = jwt.sign({
            data: email
          }, 'abc', { expiresIn: '10h' });
        res.status(200).json({message: "User saved"})
    } catch (error) {
        res.status(500).json({message: "User not saved"})
    }
})

module.exports = app