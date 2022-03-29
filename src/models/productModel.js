const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({

    productId : {
        type : String,
        required : 'ProductId is required',
        unique : true
    },
    name : {
        type : String,
        required : 'Name is required'
    },
    description : {
        type : String
    },
    tagSpecial : {
        type : Boolean,
        required : 'tagSpecial is required'
    },
    rating : {
        type : Number,
        required : 'rating is required'
    },
    tagging : [{year:Number, tagId : Number}]
    
},{timestamps:true})


module.exports = mongoose.model('Product', productSchema)
