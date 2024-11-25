import User from "../models/user.model.js";
import bcrypt from 'bcryptjs';
import { createAccessToken } from "../helpers/jwt.js";

export const register = async (req,res) =>{

    try {
      const {email, password, username} = req.body;

      //hash the password
      const hashedPassword =  await bcrypt.hash(password, 10); 
    
      //create a new user   
        const newUser =  new User({
              email,
              password:hashedPassword,
              username
          })
      
      //save the new user    
      const userSaved = await  newUser.save() 

      //create a new token
      const token = await createAccessToken({   
        id: userSaved.id,
        username: userSaved.username,
        email: userSaved.email, 
    })

    //set cookie and response tho the client
    res.cookie("token", token);
    res.status(200).json(
        {
            id:userSaved._id,
            username: userSaved.username,
            email: userSaved.email,
            createdAt: userSaved.createdAt,
            updatedAt: userSaved.updatedAt,          
        }
    )

    } catch (error) {
        console.log(error.message);
        return res.status(500).json({msg: "Server Error: " + error.message});        
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
      res.cookie("token", token);
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