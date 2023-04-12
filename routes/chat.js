const express=require('express')

const router=express.Router();

const chatController=require('../controllers/chat');

const authController=require('../middleware/auth')

router.post('/postMessage',authController.authenticate,chatController.postMessage)

router.get('/getMessage',authController.authenticate,chatController.getMessage);

module.exports=router