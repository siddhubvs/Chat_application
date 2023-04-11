const Sequelize=require('sequelize')

const sequelize=new Sequelize('chat','root','siddhu2001',
{
    dialect:'mysql',
    host:'localhost'
})

module.exports=sequelize;