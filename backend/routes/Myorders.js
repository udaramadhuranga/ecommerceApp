const express = require('express')
let Order=require('../models/orders');
const app = express()
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));


//placing a new order
app.post('/orders', (req,res)=>{

    const itemId = req.body.itemId 
    const itemprice = req.body.itemprice
    const userID = req.body.userID
    const PaidDate = new Date()
    const fullName = req.body.fullName
    const phone = req.body.Phone
    const address = req.body.address
    const district = req.body.district
    const province = req.body.province
    const postal = req.body.postal

    //creating a new order JSON object
    const newOrder = Order({

        itemId,
        itemprice,
        userID,
        PaidDate,
        fullName,
        phone,
        address,
        district,
        province,
        postal

    })

    newOrder.save().then(()=>{
        res.json("true")
    }).catch((err)=>{
        res.json(err)
    })

})

//get orders according to the user ID
app.get("/get",(req, res)=>{

    const id = req.query.id //geting user ID from request 

    Order.find({userID:id}).then((product)=>{
        res.json(product);
    }).catch((err)=>{
        console.log(err);
    });
});


module.exports=app;
