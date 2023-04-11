const express=require('express')

const app=express()

const bodyparser=require('body-parser')

const cors=require('cors')

const sequelize=require('./util/database')

const User=require('./model/user');

const userRoutes=require('./routes/user')

app.use(cors());

app.use(bodyparser.json({extended:false}))

app.use('/user',userRoutes);


sequelize.sync()
.then(result=>{
    app.listen(4000)
})
.catch(err=>console.log(err));