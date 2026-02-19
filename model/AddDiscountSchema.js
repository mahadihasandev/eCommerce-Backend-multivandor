const { Schema } = require('mongoose')
const mongoes=require('mongoose')

const AddDiscountSchema=new Schema({
    discountname:{
        type:String,
        require:true,
        unique:true,
    },
    discountamoun:{
        type:Number,
        require:true,
    },
    discounttype:{
        type:String,
        require:true,
    },
    discountrange:{
        type:String
    },
}) 

module.exports=mongoes.model("Discount",AddDiscountSchema)