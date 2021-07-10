const router =require("express").Router();
let Cart = require("../models/cart");

//insert route code
router.route("/add").post((req,res)=>{

    //Save product details in backend variable that get  from frontend
    const productId = req.body.productId;
    const product = req.body.product;
    const description =req.body.description;
    
    const price = Number(req.body.price);
    const seller =req.body.seller;
    const status =req.body.status;
    const customerID = req.body.customerID;
    
    
    
    //Product details schema
    const newproduct = new Cart({
        productId,
        product,
        description,
        price,
        seller,
        status,
        customerID


    })

    //Save product details that added to cart in MongoDB database. If there is a failiure it shows on console.
    newproduct.save().then(()=>{
        res.json(" product Added");
    }).catch((err)=>{
        console.log(err);
    })
})

//Get product that added to MongoDB through product id
router.route("/").get((req, res)=>{

    //Save products id on id variable that get from frontend 
    const id = req.query.id
    

    Cart.find({customerID:id}).then((product)=>{
        res.json(product);
        console.log(product)
    }).catch((err)=>{
        console.log(err);
    });
});

//Delete products one by one that added to MongoDB through product id
router.route("/delete/:id").delete((req, res)=>{

    let id = req.params.id;
    
    Cart.findByIdAndRemove({_id:id}).then((product)=>{
        res.json(product);
    }).catch((err)=>{
        console.log(err);
    });
});


//Delete all products at once that added to MongoDB through product id
router.route("/deletecart/:delid").delete((req, res)=>{

    console.log("=========================================");
 
    let userId = req.params.delid;
    console.log(userId);
    
    Cart.deleteMany({customerID:userId}).then((product)=>{
        res.json("success");

    }).catch((err)=>{
        console.log(err);
    });
});



module.exports=router;