const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bidUser = mongoose.model('BidUser');

const router = express.Router();

router.post('/signup', async (req,res) => {

   const {email, password} = req.body;

   try{
    const user = new bidUser({email, password});

   await user.save();
    const token = jwt.sign({userId : user._id}, 'MY_SECRET_KEY');
    res.send({token});
    }catch(err){

        return res.status(422).send(err.message);
    }
})

router.post('/signin', async (req,res) => {

    const {email, password} = req.body;

    console.log(email,password);
    if(!email || !password)
    {
        console.log("inside validation function",email,password);
        return res.status(422).send({error: 'must provide email and password'});
    }

    const user = await bidUser.findOne({email});

    if(!user)
    {
        console.log("inside check user");
        return res.status(404).send({error : 'email not found'});
    }

    try{
        console.log("inside checkpass");
        await user.comparePassword(password);
        console.log("result from dmp pass fn");
        const token = jwt.sign({userId : user._id},'MY_SECRET_KEY');
        console.log(token);
        res.send({token});

    }catch(err){

        return res.status(422).send({error :'Invalid password or email'});
    }
})

module.exports=router;