const Sequelize=require('sequelize');

const sequelize=require('../util/database');

const chat=sequelize.define('chat',{
    id:{
        type:Sequelize.INTEGER,
        allowNull:false,
        primaryKey:true,
        autoIncrement:true,
    },
    message:Sequelize.STRING,
    name:Sequelize.STRING,
})




module.exports=chat;