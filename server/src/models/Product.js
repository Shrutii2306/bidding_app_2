const mongoose =require('mongoose');

const detailSchema = new mongoose.Schema({

    price:{
        type:  Number,
        required : true
    },
    lastBidder : {
        type:String,
        required : true
    },
    creater : {
        type : String,
        required : true 
    }   
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

mongoose.model('Product', productSchema);