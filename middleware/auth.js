const user=require('../model/user');

const jwt=require('jsonwebtoken');

exports.authenticate=async(req,res,next)=>{
    try{
    const token=req.header('Authorisation');
    console.log(token);
    const User=jwt.verify(token,process.env.TOKEN_SECRET);
    user.findByPk(User.userId).then(user=>{
        req.user=user;
        next();
    })
   }catch(err){
    res.status(500).json(err);
   }

}