import expressAsyncHandler from 'express-async-handler'
import User from '../models/userModel.js'
import generateToken from '../utils/generateToken.js'

const authUser = expressAsyncHandler(async (req,res) => {
  //console.log(req.body)
  const {email, password} = req.body;
  //console.log("Email", email, password)
  const user = await User.findOne({email});
  //console.log("User", user);
  if(user && await user.matchPassword(password)){

    generateToken(res, user._id)
    // console.log("res",JSON.parse(res.cookie))
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      loggedIn:true
    })
  }else{
    res.status(400)
    throw new Error("Invalid email or Password!")
  }
  
})

const registerUser = expressAsyncHandler(async (req,res) => {
  const {name, email, password} = req.body;
  const userExists = await User.findOne({email});
  if(userExists){
    res.status(400)
    throw new Error("User already exists!")
  }
  const user = await User.create({name, email, password});

  if(user){
    generateToken(res, user._id)
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email
    })
  }else{
    res.status(400)
    throw new Error("Invalid user data!")
  }
  
})

const logOutUser = expressAsyncHandler(async (req,res) =>{
  res.cookie('jwt','',{
    httpOnly:true,
    expires: new Date(0)
  })
  res.status(200).json({"message": "User Loggedout"})
})

const getUserProfile = expressAsyncHandler(async (req,res) => {
  const user = {
    _id : req.user._id,
    name : req.user.name,
    email : req.user.email,
  }
  res.status(200).json(user)
})

const updateUserProfile = expressAsyncHandler(async (req,res) => {
  const user = await User.findById(req.user._id)
  if(user){
    
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    if(req.body.password ){ user.password = req.body.password }
    const updatedUser = await user.save();

    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email
    })


  }else{
    res.status(404)
    throw new Error('User not found!')
  }
  //res.status(200).json({"message": "User Profile Updated!"})
})


export { authUser,registerUser,logOutUser, getUserProfile, updateUserProfile  }