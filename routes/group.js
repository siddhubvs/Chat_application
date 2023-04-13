const express=require('express')

const router=express.Router();

const groupController=require('../controllers/group');

const authController=require('../middleware/auth')

router.post('/createGroup',authController.authenticate,groupController.createGroup);

router.get('/getGroups',authController.authenticate,groupController.getGroups);

router.post('/addUser',authController.authenticate,groupController.addUser);

module.exports=router