const express = require('express')
let User = require("../models/user");
const bcrypt = require('bcryptjs');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')
const cors = require('cors');
const jwt = require('jsonwebtoken')

const app = express()
const saultRounds = 10

app.use(cookieParser())
app.use(bodyParser.urlencoded({extended: true}))


//user registration
app.post("/register" , (req,res) =>{  

    //getting parameters from request body
    const username = req.body.username
    const email = req.body.email  
    const usertype = req.body.usertype

    //encrypting password for security
    bcrypt.hash(req.body.password ,saultRounds , (err,hash) =>{

      const password = hash //assigning encrypted password as new password

      //creating user JSON object
      const newUser = new User({ 
        username,
        email,
        password,
        usertype
    })   

    //check if new email is already in use
    User.findOne({ email: req.body.email }).then((user) =>{
      if(user){
        res.send({message: "Email aready in use"}) 
      }else{
        //if email is not in use 
        //create new user
        newUser.save().then(()=>{
          res.send({message: "Registration Success"})
      }).catch((err) =>{
          res.send({Error:"user details missing"})
      })}
    }).catch()  
    })
})


//purpose of this method is to get user object by using TOKEN
app.get("/post",verifyToken,(req, res) =>{
 
  if(req.user){
    res.json(req.user)
    console.log(req.user)
  }else{
    res.send({message:"Token not valid"})
  }
})



//login using email and password

app.post("/login", async(req,res) =>{
  
await User.findOne({ email: req.body.email }).then( //find corresponding email form users list 
    (user) => {

     //since the password in database is in encrypted format we have to get it and decrypt to compre with user entered password
     //That's what we are doing here with bcrypt.compare method 
     bcrypt.compare(req.body.password, user.password , (err , result) =>{ // compare passwords
      if(err || !result){
        res.send({message:"Password not valid"})
      }else{
        jwt.sign({user} , 'secretkey', (err, token) =>{
          res.json({token , usertype: user.usertype})
        }) 
      }})
    }).catch(
    (error) => {
      res.send({message: "Invalid Email"})
    }
  );
})


//verify token
function verifyToken(req , res , next){
//Get auth header value
const bearerHeader = req.headers['authorization'];
const token = bearerHeader && bearerHeader.split(' ')[1]
//checking if there is a token or not
if(token == null){
  return res.sendStatus(401)
}else{
  jwt.verify(token, 'secretkey', (err, authData)=>{ //verifing token and get user then sending back all user details  
    if(err){
      res.sendStatus(403)
    }else{
      req.user = authData
      next()
    }
  })
}
}


module.exports = app;
