const router= require('express').Router();
const {Register, Login,setAvatar,getAllUsers}=require('../controllers/userController')

router.post('/register',Register);
router.post('/login',Login);
router.post('/setAvatar/:id',setAvatar);
router.get('/allUsers/:id',getAllUsers);
module.exports=router;