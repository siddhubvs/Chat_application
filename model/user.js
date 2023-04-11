const Sequelize=require('sequelize');

const sequelize=require('../util/database');

const user=sequelize.define('user',{
    id:{
        type:Sequelize.INTEGER,
        allowNull:false,
        primaryKey:true,
        autoIncrement:true,
    },
    name:Sequelize.STRING,
    email:{
        type:Sequelize.STRING,
        allowNull:false,
        unique:true,
    },
    password:Sequelize.STRING,
    phone:Sequelize.STRING,
})




module.exports=user;