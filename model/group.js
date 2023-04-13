const Sequelize=require('sequelize');

const sequelize=require('../util/database');

const group=sequelize.define('group',{
    id:{
        type:Sequelize.INTEGER,
        allowNull:false,
        primaryKey:true,
        autoIncrement:true,
    },
    createdBy:Sequelize.STRING,
    name:Sequelize.STRING,
})




module.exports=group;