import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router";

import { validate } from "react-email-validator";
import paid from "../../img/paid.jpg"
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import NavBar from "../NavigationBar/NavBar";
import { useLocation } from "react-router-dom";
import ReceiptCard from "./ReceipteCard";

const loginStyle = {
    width: '400px',
    heigth: 'auto',
    padding: '5% 10% 0%',

}

const loginButton = {
    margin: '5% 2.5% 5%',
    backgroundColor: '#F83037',
    width: "200px"
}

const paperStyle = {
    width: "30%",
    heigth: "auto",
    padding: "2.5%",
    position: "absolute",
    top: "10%",
    left: "30%"
}

export default function Payment_success() {

    let [email, setEmail] = useState(" ");
    const [emailError, setEmailError] = useState('')
    const [display, setDisplay] = useState([]);
    const [delid, setDelid] = useState([]);

    const location =useLocation();
    const finaltotal = location.state.total;
    const fullName = location.state.name
    const Phone = location.state.phone
    const address = location.state.address
    const district = location.state.district
    const province = location.state.province
    const postal = location.state.postal


    //get and store access token
    const access_token = localStorage.getItem('token')
    console.log(access_token)
    let config = {
        headers: {
            'Authorization': 'Bearer ' + access_token
        }
    }
    //Get order details to print receipt
    axios.get('http://localhost:8090/user/post', config)
        .then((response) => {
            if (response.data.message) {
                alert(response.data.message)
            } else {
                console.log(response.data.user._id)
                setDelid(response.data.user._id);
                axios.get("http://localhost:8090/cart", { params: { id: response.data.user._id } }).then((res) => {


                    setDisplay(res.data);

                }).catch()

            }
        }).catch()




    //==========================Email Validation==========================//
    const validateEmail = (e) => {

        setEmail(e.target.value);

        if (validate(email) == true) {
            setEmailError('Valid Email')
        } else {
            setEmailError('Enter valid Email!')
        }
    }




     //==========================Send Email==========================// 
    const history = useHistory();
    function sendEmail(e) {
        e.preventDefault();

        const newRegister = {
            email,
            finaltotal,
            fullName,
            Phone,
            address,
            district,
            province,
            postal,
            display
        }

        axios.post("http://localhost:8090/onlinepay/sendmail", newRegister).then((res) => {
            // const resdata = res.data
            if (emailError === "Valid Email") {
                alert("Email sent")
            }
          

        }).catch((err) => {
            alert(err)
        })

        axios.delete(`http://localhost:8090/cart/deletecart/${delid}`)
            .then(res => {
                history.push("/productlist")
            })

    }



    return (
        <div className="container">
            <NavBar />
            <Grid container spacing={3} align="center" justify="center" alignItems="center">

                <Paper style={paperStyle} elevation={11} >
                    <Grid align="center">
                        <Typography variant="h4" style={{ color: "#F83037", fontWeight: 700, marginBottom: "5%" }}>Confirm your Email to send bill.</Typography>
                    </Grid>
                    <Grid>
                        <img src={paid} style={{ width: "300px" }} />
                    </Grid>
                    <Grid>
                        <TextField id="outlined-basic" style={{ marginTop: "5%" }} label="Email" variant="outlined" color="secondary" size="small" fullWidth required pattern="[0-9]"
                            onChange={(e) => {
                                validateEmail(e)

                            }} /> <br />

                    </Grid>
                    <Grid>
                        <Button type="submit" variant="contained" color="secondary" size="large" style={loginButton} onClick={sendEmail}>
                            Send Email
                            </Button>

                    </Grid>
                    <Grid>
                        <Typography variant="h6" >Your Receipt</Typography>
                    </Grid>
                    <Grid>
                        {
                        display.map(display => (

                            <ReceiptCard
                                key = {display._id}
                                itemId = {display.productId}
                                itemPrice = {display.price}
                            />

                    ))
                        }
                    </Grid>
                </Paper>


            </Grid>

        
        </div>


    )
}