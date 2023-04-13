const Group=require('../model/group');

const User=require('../model/user');

const UserGroup=require('../model/usergroup');

function isStringInvalid(str){
    if(str==undefined||str.length===0)
    return true;
    else
    return false;
}

exports.createGroup=async(req,res)=>{
try{
const {name}=req.body;
await Group.create({name:name,createdBy:req.user.name})
.then(async(result)=>{
    res.status(201).json({NewGroup:result});
    let id=result.id;
    await UserGroup.create({admin:true,groupname:result.name,name:req.user.name,groupId:id,userId:req.user.id})
})
}catch(err){
    res.status(500).json(err);
}
}
    

exports.getGroups=async(req,res)=>{
let id=req.user.id;
UserGroup.findAll({where:{userId:id}})
.then(result=>{
    res.status(200).json({GroupDetails:result});
})
.catch(err=>{
    res.json(err);
})
}

exports.addUser=async(req,res)=>{
    const {id}=req.body;
    try{
        const data=await UserGroup.create({groupId:id,userId:req.user.id});
        res.status(200).json({GroupUser:data});
    }
    catch(err){
        console.log(err);
    }
}