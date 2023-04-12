const User=require('../model/user');

const bcrypt=require('bcrypt');

const jwt=require('jsonwebtoken');

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

const tokengenerator=function(id,name){
    return jwt.sign({userId:id,name:name},process.env.TOKEN_SECRET);
}

async function login(req,res,next){
    const {email,password}=req.body;
    if(isStringInvalid(email) || isStringInvalid(password)){
        return res.status(400).json({err:"Email or password is missing"})
    }
    try{
    const user=await User.findAll({where:{email}})
    if(user.length>0){
    bcrypt.compare(password,user[0].password,async(err,result)=>{
    if(err){
            throw new Error('Something went wrong');
    }
    if(result===true)
    res.status(200).json({success:true,message:'User login successful',token:tokengenerator(user[0].id,user[0].name)});
    else
    return res.status(401).json({success:false,message:'User not authorized'});
    })
    }       
    else{
        return res.status(404).json({success:false, message:'User not found'})
    }
    }
    catch(error){
        return res.status(500).json(error);
    }
}


module.exports={
    signup,
    login,
    tokengenerator
}