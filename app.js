const express=require('express')

const app=express()

const bodyparser=require('body-parser')

const cors=require('cors')

require('dotenv').config()

const sequelize=require('./util/database')

const User=require('./model/user');

const chat=require('./model/chat');

const userRoutes=require('./routes/user')

const chatRoutes=require('./routes/chat');

app.use(cors());

app.use(bodyparser.json({extended:false}))

app.use('/user',userRoutes);

app.use('/chat',chatRoutes);

User.hasMany(chat);

chat.belongsTo(User);

sequelize.sync()
.then(result=>{
    app.listen(4000)
})
.catch(err=>console.log(err));