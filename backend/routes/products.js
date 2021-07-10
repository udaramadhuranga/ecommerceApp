//product backend  crud operations implementation and routings are in this js file

const router =require("express").Router();
let products = require("../models/products"); //import product model schema from models

//insert route code
router.route("/add").post((req,res)=>{

    const product = req.body.product;
    const description =req.body.description;
    
    const price = Number(req.body.price);
    const seller =req.body.seller;
    const category =req.body.category;
    
    const selectedfile = req.body.selectedfile;

    const newproduct = new products({
        product,
        description,
        price,
        seller,
        category,
        selectedfile


    })

    newproduct.save().then(()=>{
        res.json("New product Added");
    }).catch((err)=>{
        console.log(err);
    })
})

//get route code(reading all products details)
router.route("/readAll").get((req,res)=>{

    products.find().then((events)=>{
        res.json(events)
    }).catch((err)=>{
        console.log(err)
    })
})

//update route code(update a certian product's details)
router.route("/update/:id").patch(async(req,res)=>{

    let productID = req.params.id;
    const{product,description,price,seller,category} = req.body; //di structure method

    const updateproduct = {
        
        product,
        description,
        price,
        seller,
        category,
        
        
        

    }
//find the certain product that needed to update and update the product 
    const update = await products.findByIdAndUpdate(productID,updateproduct,{new:true}).then(()=>{

        res.status(200).send({status:"product updated"})
    }).catch((err)=>{
        console.log(err);
        res.status(500).send({status:"error with product updating process"});
    })

//delete route code (delete a certain product details)
    router.route("/delete/:id").delete(async(req,res)=>{
        let eventID = req.params.id;
    
        await products.findByIdAndDelete(eventID).then(()=>{
            res.status(200).send({status:"event deleted"});

        }).catch((err)=>{
            console.log(err.message)
            res.status(500).send({status:"error with event deleting process "})
        })
    })

   

})

//route code with is used to  read all products details which are added by a perticular seller(according to the login seller (sessions used)) 
router.route("/read").get((req,res)=>{

    

    let sellerID = req.query.id;
    console.log(sellerID);

//find the certain product that needed to delete and delete the product 

    products.find({seller:sellerID}).then((events)=>{
        res.json(events)
    }).catch((err)=>{
        console.log(err)
    })
})

// route code for search products

router.route("/search").get((req,res)=>{

    

    let productId = req.query.id;
    console.log(productId);

    products.find({product: { $regex: '.*' + productId + '.*',$options: 'i' } }).limit(5).then((events)=>{
        res.json(events)
    }).catch((err)=>{
        console.log(err)
    })
})

module.exports=router;