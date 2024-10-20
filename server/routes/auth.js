import express from 'express';
import { Router } from 'express';
import User from '../models/UserModel.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
const router = express.Router();

// Route to create a user 
router.post("/register", async(req, res) => {
    const {username, password} = req.body;
    
    const user = await User.findOne({username: username})
    if(user){
        return res.status(200).json({message: "The user already exists"})
    }
    else{
        const hashedPassword = await bcrypt.hash(password, 10)
        const newUser = new User({
            username: username,
            password: hashedPassword
        })
        await newUser.save();
        
        return res.status(200).json({message: "User successfully added"})
    }
})

router.post("/login", async(req, res) => {
    const {username, password} = req.body;
    
    try {
        const user = await User.findOne({username: username})
        if(!user){
            return res.json({message: "The user does not exists"})
        }
        const isValidPassword = await bcrypt.compare(password, user.password)
        if(!isValidPassword){
            return res.json({message: "The password is wrong"})
        }
        const token = jwt.sign({id: user._id}, "secret")
        res.json({token, userID: user._id})
    } catch (error) {
        console.log(error)
    }
})

export {router as UserRouter};

