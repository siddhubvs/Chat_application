const Chat=require('../model/chat');

const User=require('../model/user');
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
        const data=await Chat.create({message,userId:req.user.id,name:req.user.name});
        res.status(201).json({NewChatDetail:data});
    }
    catch(err){
    res.status(500).json(err);
    }
}
exports.getMessage=async(req,res)=>{
    try{
        const messages=await Chat.findAll();

        res.status(200).json({AllChats:messages});
    }catch(err){
        res.status(500).json(err);
    }
}