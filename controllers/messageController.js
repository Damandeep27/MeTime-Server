const {Message}=require('../model/Message')

module.exports.addMessage=async(req,res,next)=>{
    try {
        const{from,to,message}=req.body;
        const data=await Message.create({
            message:{text:message},
            users:[from,to],
            sender:from,
        });
        if(data)return res.json({msg:"Message added successfully"});
        return res.json({msg:"Failed to add message to the database"});
        
    } catch (error) {
        next(error);
    }
}
module.exports.getAllMessage=async(req,res,next)=>{
    try {
        const{from,to}=req.body;
        const messages=await Message.find({
            users:{
                $all:[from,to],
            },
        }).sort({upatedAt:1});
        const projectmessages=messages.map((msg)=>{
            return{
                fromSelf:msg.sender.toString()===from,
                message:msg.message.text,
            }
        })
        res.json(projectmessages);
    }
        
     catch (error) {
        next(error);
    }
}