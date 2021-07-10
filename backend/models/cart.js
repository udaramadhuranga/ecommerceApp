//Product model that adding to MongoDB

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CartSchema = new  Schema({

    productId:{
       type:String,
      
   },
   
    product:{
        type : String,
        

    },

    description :{

        type: String,
        required :true

    },

    price :{
        type: Number,
        required :true


    },

   seller  :{
    type: String,
    required :true 

    },

    customerID:{
        type:String,
    },

    status :{
        type :String
    }

     


})

const cart = mongoose.model("cart",CartSchema);
module.exports =cart;