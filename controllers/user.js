const User=require('../model/user');

const bcrypt=require('bcrypt');

function isStringInvalid(str){
    if(str==undefined||str.length===0)
    return true;
    else
    return false;
}
   async function signup(req,res,next){
    const {name,email,phone,password}=req.body;
    try{
    if(isStringInvalid(name) || isStringInvalid(email) || isStringInvalid(phone) || isStringInvalid(password)){
        return res.status(400).json({err:"Bad paramters : Something is missing"})
    }
    
    const data=await User.findOne({where:{email}});
    if(data){
        return res.status(200).json({message:'User already exists'});
    }
   
    bcrypt.hash(password,10,async(err,hash)=>{
    await User.create({name,email,phone,password:hash})
    res.status(201).json({message:'Successfully created new user'});
    })
    }
    
    catch(err){
    res.status(500).json({message:'User already exists'})
    }

   }

module.exports={
    signup,
}