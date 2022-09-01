const mongoose=require('mongoose');

const userSchema=new mongoose.Schema({
    userName:{
        type:String,
        required:true,
        min:3,
        max:20,
        unique:true
    },
    email:{
        type:String,
        required:true,
        max:50,
        unique:true
    },
    password:{
        type:String,
        required:true,
        min:8
    },
    hasAvatar:{
        type:Boolean,
        default:false
    },
    avatar:{
        type:String,
        default:""
    }

    
})
userSchema.set('toJSON', {
    transform: function(doc, ret, options) {
        delete ret.password;
        return ret;
    }
});
const User=mongoose.model('User',userSchema);
module.exports={User};
