const express = require('express');
const mongoose = require('mongoose');
const requireAuth = require('../middlewares/requireAuth');

const Product = mongoose.model('Products');

router.use(requireAuth);

router.get('./products',async(req,res) => {

    const products = await Product.find();
    res.send(tracks);
});

module.exports = router;