const Chat=require('../model/chat');

const sequelize=require('../util/database');

function isStringInvalid(str){
    if(str==undefined||str.length===0)
    return true;
    else
    return false;
}

exports.postMessage=async(req,res)=>{
    const {message}=req.body;
    try{
        if(isStringInvalid(message)){
            return res.status(400).json({err:"Bad paramter : Message is missing"})
        }
        const data=await Chat.create({message,userId:req.user.id});
        res.status(201).json({NewChatDetail:data});
    }
    catch(err){
    res.status(500).json(err);
    }
}