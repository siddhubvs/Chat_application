const express=require('express')

const router=express.Router();

const groupController=require('../controllers/group');

const authController=require('../middleware/auth')

router.post('/createGroup',authController.authenticate,groupController.createGroup);

router.get('/getGroups',authController.authenticate,groupController.getGroups);

router.post('/addMember/:id',authController.authenticate,groupController.addMember);

router.post('/postMessage/:id',authController.authenticate,groupController.postMessage);

router.get('/getMessages/:id',authController.authenticate,groupController.getMessages);

router.get('/getMembers/:id',authController.authenticate,groupController.getMembers);

router.post('/makeAdmin/:id',authController.authenticate,groupController.makeAdmin);

router.post('/removeMember/:id',authController.authenticate,groupController.removeMember);

router.get('/getGroupName/:id',authController.authenticate,groupController.getGroupName);

module.exports=router