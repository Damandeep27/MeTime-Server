const router= require('express').Router();
const {getAllMessage,addMessage}=require('../controllers/messageController')

router.post('/add',addMessage);
router.post('/getAll',getAllMessage);

module.exports=router;