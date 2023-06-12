const express = require("express");
const bcrypt = require("bcrypt");
const { userModel, logoutModel, postModel } = require("../model/user.model");

var jwt = require('jsonwebtoken');
const { auth } = require("../middleware/auth.middleware");

const contentRouter = express.Router();

contentRouter.get('/',auth, async(req, res)=>{
 try{
    const data = await postModel.find({userID:req.body.userID})
    res.send(data)
 }catch(err){
    res.status(400).send(err.message)
 }
})


contentRouter.post('/add',auth, async(req, res)=>{
    const {title, body, device, no_of_comments, userID, user}= req.body
    try{
        const post = postModel({title, body, device, no_of_comments, userID, user})
        await post.save();
        res.status(200).send(req.body)
    }catch(err){
        res.send({err: err.message})
    }
})


contentRouter.get('/edit/:id',auth, async(req, res)=>{
    console.log(req.params)
        try{
            const data = await postModel.find({ _id:req.params.id})
            console.log(data)
            res.status(200).send(data)
        }catch(error){
            res.status(400).send(error)
        }
    })


    
contentRouter.patch('/update/:postID',auth, async(req, res)=>{
    const userID= req.body.userID;
    const {postID} = req.params
    
    try{
        const post= await postModel.findOne({_id:postID})
        const userIdInpost = post.userID

        if(userIdInPost==userID){
            await postModel.findByIdAndUpdate({_id: postID}, req.body)
            res.send({msg:"Post has been updated", post:req.body})
        }else{
            res.send({msg:"Not Authorized"})
        } 
    }catch(error){
        res.status(400).send({error:error.message, heree:"error"})
    }
    
})










    contentRouter.delete('/delete/:postID',auth, async(req, res)=>{
        const userID= req.body.userID;
        const {postID} = req.params
        
        try{
            const post= await postModel.findOne({_id:postID})
            const userIdInpost = post.userID
    
            if(userIdInpost==userID){
                await postModel.findByIdAndDelete({_id: postID})
                res.send({msg:"post has been deleted"})
            }else{
                res.send({msg:"Not Authorized"})
            } 
        }catch(error){
            res.status(400).send({error:error.message, heree:"asfds"})
        }
    })

module.exports={
    contentRouter
}