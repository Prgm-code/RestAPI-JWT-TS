import { Request,Response } from "express";
import User ,{ IUser } from '../models/users';

import jwt from 'jsonwebtoken';



export const signup = async (req :Request, res: Response) => {
    try {

         //saving a new user 
    console.log(req.body)
    const user:IUser = new User ({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,


    });
    user.password = await user.encryptPassword(user.password);
    
    const saveUser = await user.save();
    console.log(saveUser);

    //token 
    const token : string = jwt.sign({_id: saveUser._id,}, process.env.TOKEN_SECRET || 'tokentest');

    res.header('auth-token',token).json(saveUser);


    } catch(e){
        console.log(e);
        res.status(400).json(e);
    }
   
    
};

export const signin = async (req :Request, res: Response) => {
    try {
        console.log(req.body);

        const user= await User.findOne({email:req.body.email});
        if (!user) return res.status(400).json('Email or Password is wrong');
    
        const correctPassword: boolean  = await user.validatePassword(req.body.password);
        if(!correctPassword) return res.status(400).json('Invalid Password');
    
       const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET || 'tokentest',{expiresIn: 60*60*24
    })
        res.header('auth-token',token ).json(user);


    }catch(e){
        console.log(e);
        res.status(400).json(e);
    }

};

export const profile = async (req :Request, res: Response) => {
    const user = await User.findById(req.userId);
    if(!user) return res.status(404).json('No user found');
    res.json(user);
    
    
};  