const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    email:{
        type: String,
        required:true,
        unique: true,
        trim: true,
        match: [/^[a-zA-Z0-9._%+-]+@gmail\.com$/, "Only Gmail accounts are allowed"],
    },
    password:{
        type: String,
        required:true,
    }
},{timestamps:true})

module.exports = mongoose.model("User",userSchema)