const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ATMSchema = new Schema({

    _id : mongoose.Schema.Types.ObjectId,
    type : {
        type : String,
        required : false
    },
    number :{
        type : Number,
        required : false
    },
    year :{
        type : Number,
        required : false
    },
    date :{
        type : Number,
        required : false
    },
    cvc :{
        type : Number,
        required : false
    },
    amount :{
        type : Number,
        required : false
    },
    payable :{
        type : Number,
        required : false
    }

})

const Atm = mongoose.model("Atm",ATMSchema);
module.exports = Atm;