//create product schema which is going to store in mongodb.includes all the attributes that neededed to store in a product

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new  Schema({

    product:{
        type : String,
        required:true

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

      category:{
        type: String,
        required :true 
    
        },


    selectedfile:{
        type:String,
        default:null

    }

})

const products = mongoose.model("product",ProductSchema); //model the product schema in the mongodb products collection
module.exports =products;  // export the schema to use in another js file