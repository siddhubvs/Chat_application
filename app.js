const express=require('express')

const app=express()

const bodyparser=require('body-parser')

const cors=require('cors')

require('dotenv').config()

const sequelize=require('./util/database')

const User=require('./model/user');

const chat=require('./model/chat');

const Group=require('./model/group');

const UserGroup=require('./model/usergroup')

const GroupMessage=require('./model/groupmessage');

const userRoutes=require('./routes/user')

const chatRoutes=require('./routes/chat');

const GroupRoutes=require('./routes/group');

app.use(cors());

app.use(bodyparser.json({extended:false}))

app.use('/user',userRoutes);

app.use('/chat',chatRoutes);

app.use('/group',GroupRoutes);

User.hasMany(chat);

chat.belongsTo(User);

User.belongsToMany(Group,{through:UserGroup});

Group.belongsToMany(User,{through:UserGroup});

User.hasMany(GroupMessage);

GroupMessage.belongsTo(User);


sequelize.sync()
.then(result=>{
    app.listen(4000)
})
.catch(err=>console.log(err));