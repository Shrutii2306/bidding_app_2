const mongoose =require('mongoose');

const detailSchema = new mongoose.Schema({

    price: Number,
    lastBidder : String,
    creater : String    
}) 

const productSchema = new mongoose.Schema({

    userId : {

        type: mongoose.Schema.Types.ObjectId,
        ref : 'BidUser'
    },
    name : {

        type: String,
        required : true
    },
    details : [detailSchema]
});

mongoose.model('Products', productSchema);