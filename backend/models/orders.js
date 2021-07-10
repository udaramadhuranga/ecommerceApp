const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const myorders = new Schema({


    itemId :{
        type : String,
        required : true
    },
    itemprice :{
        type : String,
        required : true
    },
    userID :{
        type : String,
        required : true
    },
    PaidDate :{
        type : String,
        required : true
    },
    fullName :{
        type : String,
        required : true
    },
    phone :{
        type : String,
        required : true
    },
    address :{
        type : String,
        required : true
    },
    district :{
        type : String,
        required : true
    },
    province :{
        type : String,
        required : true
    },
    postal :{
        type : String,
        required : true
    }

})

const order = mongoose.model("Myorder",myorders);
module.exports = order;