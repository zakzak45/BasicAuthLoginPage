const mongoose = require('mongoose')



const UserSchema = new mongoose.Schema({
username:{
    type:String,
    required:true,
    trim:true
},
email:{
    type:String,
    unique:true,
    required:true
},
password:{
    type:String,
    unique:true,
    required:true
},
CreatedAt:{
    type:Date,
    default:Date
}
})



module.exports = mongoose.model("User",UserSchema)