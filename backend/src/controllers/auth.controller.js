import User from "../models/user.model.js";
import bcrypt from 'bcryptjs';
import { createAccessToken } from "../helpers/jwt.js";
import jwt from 'jsonwebtoken';

export const register = async (req, res) => {
    try {
      const { username, email, password } = req.body;
  
      const userFound = await User.findOne({ email });
  
      if (userFound)
        return res.status(400).json(["The email is already in use"]);
  
  
      // hashing the password
      const passwordHash = await bcrypt.hash(password, 10);
  
      // creating the user
      const newUser = new User({
        username,
        email,
        password: passwordHash,
      });
  
      // saving the user in the database
      const userSaved = await newUser.save();
  
      // create access token
      const token = await createAccessToken({
        id: userSaved._id,
      });
  
      res.cookie("token", token, {
        httpOnly: process.env.NODE_ENV !== "development",
        secure: true,
        sameSite: "none",
      });
  
      res.json({
        id: userSaved._id,
        username: userSaved.username,
        email: userSaved.email,
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

export const login = async (req,res) =>{
    try {
        const {email, password} = req.body;

        //check if user exists

       const userFound = await User.findOne({email});

       if(!userFound){
        return res.status(400).json({msg: "User not found"});
       };
       
        //compare the password
        const passwordIsMatch =  await bcrypt.compare(password, userFound.password); 

        if(!passwordIsMatch){
            return res.status(400).json({msg: "invalid credentials"});
        }

      
        //create a new token
        const token = await createAccessToken({   
          id: userFound.id,
          username: userFound.username,
          email: userFound.email, 
      })
  
      //set cookie and response tho the client
      res.cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
      });

      res.status(200).json(
          {
              id:userFound._id,
              username: userFound.username,
              email: userFound.email,
              createdAt: userFound.createdAt,
              updatedAt: userFound.updatedAt,       
          }
      )
  
      } catch (error) {
          console.log(error.message);
          return res.status(500).json({msg: "Server Error: " + error.message});        
      }
};

export const logout = async (req,res) => {
    res.cookie("token", "", {expires: new Date(0)});
    return res.status(200).json({msg: "Logout Success"});
};

export const profile = async (req,res) => {
    
  const userFound = await User.findById(req.user.id);

  if(!userFound) {
    return res.status(404).json({msg: "user not found"});
  }

  return res.status(200).json({
    id: userFound._id,
    username: userFound.username,
    email: userFound.email,
    createdAt: userFound.createdAt,
    updatedAt: userFound.updatedAt,
  })
};

export const verifyToken = async (req, res) => {
  const { token } = req.cookies;
  if (!token) return res.send(false);

  jwt.verify(token, process.env.SECRET_KEY, async (error, user) => {
    if (error) return res.sendStatus(401);

    const userFound = await User.findById(user.id);
    if (!userFound) return res.sendStatus(401);

    return res.json({
      id: userFound._id,
      username: userFound.username,
      email: userFound.email,
      cookie:token   
    });
  });
};