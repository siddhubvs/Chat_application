const Group=require('../model/group');

const User=require('../model/user');

const UserGroup=require('../model/usergroup');

const GroupMessage=require('../model/groupmessage');

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


exports.addMember=async(req,res)=>{
let {mail,admin}=req.body;
let gid=req.params.id;
console.log(mail,gid,admin);
let userID=req.user.id;
let user=await UserGroup.findOne({where:{userId:userID,groupId:gid}});
if(user.admin==true){
let usercheck=await User.findOne({where:{email:mail}});
if(usercheck){
let groupdata=await Group.findOne({where:{id:gid}});
let grpName=groupdata.name;
let grpid=groupdata.id;
let uname=usercheck.name;

UserGroup.create({admin:admin,groupname:grpName,name:uname,userId:usercheck.id,groupId:grpid})
.then(result=>{
    res.json("user added to group")
})
.catch(err=>{
    res.json("something went wrong");
})
}
else{
    res.json("user not found with that email")
}
}
else{
    res.json("youre not admin or group doesn't exist")
}
}

exports.postMessage=async(req,res)=>{
try{
const gid=req.params.id;
const {msg}=req.body;
const usergroup=await UserGroup.findOne({where:{groupId:gid,userId:req.user.id}});
if(usergroup){
const data=await GroupMessage.create({message:msg,username:req.user.name,groupid:gid,userId:req.user.id})
res.status(201).json(data);
}
else{
res.status(400).json("Group not exists");
}
}catch(err){
    res.status(500).json(err);
}
}

exports.getMessages=async(req,res)=>{
try{
const gid=req.params.id;
const usergroup = await UserGroup.findOne({where:{groupId:gid,userId:req.user.id}});
if(usergroup){
const data=await GroupMessage.findAll({where:{groupid:gid}})
res.status(200).json(data);
}
else{
res.status(400).json("Group doesnt exist");
}
}catch(err){
res.status(500).json(err);
}
}

exports.getMembers=async(req,res)=>{
try{
const gid=req.params.id;
const usergroup=await UserGroup.findOne({where:{groupId:gid,userId:req.user.id}});
if(usergroup){
const data=await UserGroup.findAll({where:{groupId:gid}})
res.status(200).json(data);
}
else{
res.json("User not in group");
}
}catch(err){
    res.status(500).json(err);
}
}

exports.makeAdmin=async(req,res)=>{
try{
const gid=req.params.id;
const {userid}=req.body;
const usergroup=await UserGroup.findOne({where:{groupId:gid,userId:req.user.id}})
if(usergroup.admin===true){
const data=await UserGroup.update({admin:true},{where:{userId:userid,groupId:gid}})
res.status(201).json(data);
}
else{
res.status(400).json("Not an admin");
}
}
catch(err){
res.status(500).json(err);
}
}

exports.removeMember=async(req,res)=>{
  try{
  const gid=req.params.id;
  const {userid}=req.body;
  const usergroup=await UserGroup.findOne({where:{groupId:gid,userId:req.user.id}});
  if(usergroup.admin==true){
  await UserGroup.destroy({where:{userId:userid,groupId:gid}})
  res.status(201).json('User removed from group');
  }
  else{
    res.status(400).json("User cannot be removed from group");
  }
  }
  catch(err){
    res.status(500).json(err);
  }
}

exports.getGroupName=async(req,res)=>{
try{
const gid=req.params.id;
const data=Group.findOne({where:{id:gid}})
res.status(200).json(data);
}
catch(err){
res.status(500).json(err);
}
}