import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{
        type : String,
        minLength:2,
        maxLength:50,
        requried :[true,'User Name is Requried'],
        trim : true,
    },
    email:{
        type : String,
        trim : true,
        unique:true,
        requried : [true,'Email is Requried'],
        lowercase : true
    },
    password:{
        type : String,
        requried : true,
        minLength:6,
    }

},{timestamps:true})
const UserModel = mongoose.model('User',userSchema)
export default UserModel;

