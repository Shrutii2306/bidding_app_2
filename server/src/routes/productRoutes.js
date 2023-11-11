const express = require('express');
const mongoose = require('mongoose');
const requireAuth = require('../middlewares/requireAuth');

const Product = mongoose.model('Product');
const router = express.Router();

router.use(requireAuth);

router.get('./products',async(req,res) => {

    const products = await Product.find({});
    res.send(products);
});

router.post('/products',async(req, res) => {

    const {name, details} = req.body;
    
    if(!name || !details){

        return res.status(422).send({error:'you must provide name and details'});
    }

    try{
        const product = new Product({name, details, userId : req.user._id});
    await product.save();
    res.send(product);
    }catch(err){

        res.status(422).send({error: err.message});
    }
})

module.exports = router;