const express = require("express");
const  { User }  = require("../Modale/user_m");
const router = express.Router()

router.get(`/list`,async (req, res) =>{    
        const userList = await User.find().sort({createdAt:-1})
               console.log(userList);
                if(!userList) 
                {       
                    res.status(500).json({success:false});      
                }  
            res.status(200).json({userList});    
});

router.post("/add",async(req,res)=>
{
    try {
const userData =await User.findOne({email:req.body.email})
if(userData){
    return res.status(400).json({message:"Email already exist",vaild:false})
}
const user=await User.create({...req.body})
        res.status(200).json({data:user,message:"use successfully added",vaild:true})    
    } catch (error) {
        res.status(500).json(error)
    }

})

module.exports=router