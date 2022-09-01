const {User}= require('../model/User')
const brcypt=require('bcrypt');

const Register= async (req,res, next)=>{
   try{
    const {userName, email, password}=req.body;
    const userNameCheck= await User.findOne({userName})
    if(userNameCheck){
        return res.send({status:false,msg:"Username not available"});
    }
    const emailCheck= await User.findOne({email});
    if(emailCheck){
        return res.send({status:false,msg:"Email already used"});
    }

    const hashedPassword=await brcypt.hash(password,10);
    console.log(hashedPassword);
    const user= await User.create({
        userName,
        email,
        password:hashedPassword});

    user.toJSON();
    return res.json({status:true,user})
   }catch(err){
    next(err);

   }
}
const Login=async (req, res,next)=>{
    try{
        const {userName, password}=req.body;
        const user= await User.findOne({userName});
        if(!user){
            
            return res.send({status:false,msg:"Username or Password does not match"});
        }

        const passwordCheck= await brcypt.compare(password,user.password)
      
       
        if(!passwordCheck){
            return res.send({status:false,msg:"Username or Password does not match"});
        }

    
        user.toJSON();
        return res.json({status:true,user})
       }catch(err){
        next(err);
       }

}

const setAvatar=async (req, res,next)=>{
    
    try{

        const id=req.params.id;
        const {image}=req.body;

        const user= await User.findByIdAndUpdate(id,{
            hasAvatar:true,
            avatar:image
        });
        
        return res.json({isSet:user.hasAvatar,image:user.avatar})

        
       }catch(err){
        next(err);
       }

}
const getAllUsers=async (req, res,next)=>{
    
    try{

        const id=req.params.id;
       
        

        const users= await User.find({
          _id:{$ne:id}
        },{
            hasAvatar:0,
            __v:0,
            password:0
        }
        )
        
        return res.json(users)

        
       }catch(err){
        next(err);
       }

}

module.exports={Register,Login,setAvatar, getAllUsers};