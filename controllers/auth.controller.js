import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken'
import UserModel from '../models/user.model.js'
export const signup = async (req, res, next) => {
 
  try {
    const { name, email, password } = req.body;
    const existingUser = await UserModel.findOne({ email })
    if (existingUser) {
      return res.status(409).json({ message: 'User Already Exists' });
    }
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    const newUser = await UserModel.create({
      name,
      email,
      password: hashPassword,
    });
    const token = jwt.sign(
      { userId: newUser._id },
      process.env.JWT_SECRET,
      { expiresIn: '30d' }
    );

    res.status(201).json({
      message: `User Created Successfully Email: `,
      newUser,
      token,
      userId: newUser._id,
    });
  } catch (error) {
    console.log(error);
  }
};


export const signin = async( req,res)=>{
  try {
    const {email,password} = req.body;
    const checkUser = await UserModel.findOne({email});
    if(!checkUser){
      return res.status(409).json({message:"User Does Not Exists"})
    }
    const passwordValid = await bcrypt.compare(password,checkUser.password);
    if(!passwordValid){
      return res.status(401).json({message:"Invalid Credentials"})
    }
    const token = jwt.sign({
       id: checkUser._id,      
    name: checkUser.name,   
    email: checkUser.email 
    },process.env.JWT_SECRET,
   {expiresIn:'7d'}, )
    return res.status(200).json({message:"User Successfully Signed-In" ,
      data:{
        token,checkUser
      }
    })
    
  } catch (error) {
    console.log(error);
  }
  

}
export const signout = (req, res) => {
  try {
    return res.status(200).json({
      message: "User successfully signed out",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error while signing out" });
  }
};
