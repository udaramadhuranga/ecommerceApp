const express =require("express");
const mongoose = require("mongoose");
const bodyParser =require("body-parser");
const cors = require("cors");
const dotenv =require("dotenv");
const app = express();
require("dotenv").config()

const productsrouter = require("./routes/products");
const userRouter = require("./routes/users.js");
const cartRouter = require("./routes/cart.js");
const PaidRouter = require("./routes/Myorders.js");
const PaymentRouter = require("./routes/AtmUser.js");



const PORT = process.env.PORT || 8090;

app.use(cors());
app.use(bodyParser.json({limit:"30mb",extended:true}));
app.use(bodyParser.urlencoded({limit:"30mb",extended: true}));


const URL =process.env.MONGODB_URL;
mongoose.connect(URL,{
    useCreateIndex:true,
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useFindAndModify:false
});

const connection = mongoose.connection;
connection.once("open",()=>{
    console.log("mogo db connection  success")
})


app.use("/products",productsrouter);
app.use("/user",userRouter);
app.use("/cart",cartRouter); // use the cart route
app.use("/onlinepay",PaymentRouter);
app.use("/order",PaidRouter);



app.listen(PORT,()=> {console.log(`Server is up and running on ${PORT}`)});