import React, { useState } from "react";
import axios from "axios";
import master from "../../img/Master.png"
import visa from "../../img/visa.png"
import cards from "../../img/cards.png"
import bill from "../../img/bill.png"
import sim from "../../img/sim.jpg"
import { useHistory } from "react-router";
import useVisibilityToggler from "../../hooks/UseVisibilityToggler";
import { useLocation } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import FormLabel from '@material-ui/core/FormLabel';
import TotalPrice from '../Cart/Components/TotalPrice';
import NavBar from "../NavigationBar/NavBar";

const random = require("simple-random-number-generator");

const loginStyle = {
    width: '400px',
    heigth: 'auto',
    padding: '5% 10% 0%',

}

const loginButton = {
    margin: '5% 2.5% 5%',
    backgroundColor: '#F83037',
    width: "100px"
}

const paperStyle = {
    width: "30%",
    heigth: "auto",
    padding: "2.5%",
    position: "absolute",
    top: "15%"
}

export default function Payment(props) {

    //============================ Get data from cart component================================
    const location = useLocation();
    const finaltotal = location.state.total;
    const fullName = location.state.name
    const Phone = location.state.phone
    const address = location.state.address
    const district = location.state.district
    const province = location.state.province
    const postal = location.state.postal



    const [type, setType] = useState(" ");
    const [number, setNumber] = useState();
    const [year, setYear] = useState();
    const [date, setDate] = useState();
    const [cvc, setCvc] = useState();
    const [payable, setPayable] = useState();
    const [phone, setPhone] = useState();
    const [pin, setPin] = useState();
    

    //============================ useState for Spinners================================
    const [loading, setLoading] = useState(false);
    const [loadingp, setLoadingp] = useState(false);
    const [loadingOTP, setLoadingOTP] = useState(false);



    const [otpno, setOtp] = useState(null);
    let otp, otpcheck;


    //============================VALIDATION================================

    const [numberError, setNumberError] = useState();
    const [pinError, setPinError] = useState();

    const validateNumber = (e) => {

        (setPhone("+94" + e.target.value));    //set user entered value into state

        if (e.target.value.length > 9 || e.target.value.length < 9) {   //check phone number length less or higher to 9
            setNumberError("invalid Number")    //set error as invalid number
        } else {  
            setNumberError("")   
        }
    }

    const validatePinNumber = (e) => {

        (setPin(e.target.value));   //set user entered value into state

        if (e.target.value.length > 4 || e.target.value.length < 4) {  //check pin number length less or higher to 4
            setPinError("Enter 4 digit Number") //set error as Enter 4 digit Number
        } else {
            setPinError("")
        }
    }


    //============================CARD PAYMENT FUNCTION================================

    const history = useHistory();

    function sendData(e) {
        setLoading(true)
        e.preventDefault();
        
        //store user entered data into object
        const newuser = {     
            type,
            number,
            year,
            date,
            cvc,
            payable

        }

           //send newuser object to backend 
        axios.post("http://localhost:8090/onlinepay/card", newuser).then((res) => {

            setTimeout(() => {
                setLoading(false)
                const resdata = res.data
                if (resdata === "true") {    // if backend task successfully completed received the message as true

                    //get and store access token
                    const access_token = localStorage.getItem('token')
                    let config = {
                        headers: {
                            'Authorization': 'Bearer ' + access_token
                        }
                    }

                    axios.get('http://localhost:8090/user/post',
                        config)
                        .then((response) => {
                            if (response.data.message) {
                                alert(response.data.message)
                            } else {

                                //get item details from the database 
                                axios.get("http://localhost:8090/cart", { params: { id: response.data.user._id } })
                                    .then(res => {
                                        res.data.map((item) => {

                                            let itemId = item.productId
                                            let itemprice = item.price
                                            let userID = response.data.user._id

                                            const neworder = {

                                                itemId,
                                                itemprice,
                                                userID,
                                                fullName,
                                                Phone,
                                                address,
                                                district,
                                                province,
                                                postal

                                            }
                                                //send neworder object to backend to save the data
                                            axios.post("http://localhost:8090/order/orders", neworder).then((res) => {

                                                if (res.data == "true") {
                                                  //  alert("success")
                                                } else {
                                                    alert("error")
                                                }

                                            }).catch((err) => {
                                                alert(err)
                                            })

                                        })
                                    })

                                history.push("/success",{//navigate the payment_success page and send data
                                    name:fullName,
                                    phone:phone,
                                    address:address,
                                    district:district,
                                    province:province,
                                    postal:postal,
                                    total:finaltotal,
                                })  

                            }

                        }).catch()

                }
                else if (resdata === "false") {
                    alert(res.data);

                }
                else if (resdata === "balance insufficient") {    //if received the message as balance insufficient
                    history.push("/failed")  //navigate the payment_failed page

                }

            }, 3000)

        }).catch((err) => {
            alert(err)
        })

    }

    //============================OTP Generator================================
    function OTPgenerator() {

        let params = {

            min: 1001,    //min value
            max: 9999,    //max value
            integer: true
        };

        otp = random(params);  //generate otp
        otpcheck = otp;

        setOtp(otp);
        return otpcheck;

    }



    //============================SEND OTP ================================
    function sendSms(e) {
        toggleOTPvisibility();
        e.preventDefault(e);
        setLoadingp(true)

        OTPgenerator()
        const newOTP = {
            phone,
            otp
        }

        //send  newOTP object to backend
        axios.post("http://localhost:8090/onlinepay/phone", newOTP).then((res) => {
            setTimeout(() => {
                setLoadingp(false)
                alert("OTP sent ")
                if (res.data == "true") {
                }
            }, 2000)
        })
    }


    function cancel() {
        history.push("/cart")
    }




    //============================CHECK OTP ================================
    function checkOTP() {
        setLoadingOTP(true);

        console.log(pin);

        setTimeout(() => {
            setLoadingOTP(false);
            if (pin == otpno) {   // if otp number is matched to the client entered otp
                
                   //get and store access token
                   const access_token = localStorage.getItem('token')
                   let config = {
                       headers: {
                           'Authorization': 'Bearer ' + access_token
                       }
                   }

                   axios.get('http://localhost:8090/user/post',
                       config)
                       .then((response) => {
                           if (response.data.message) {
                               alert(response.data.message)
                           } else {

                               //get item details from the database 
                               axios.get("http://localhost:8090/cart", { params: { id: response.data.user._id } })
                                   .then(res => {
                                       res.data.map((item) => {

                                           let itemId = item.productId
                                           let itemprice = item.price
                                           let userID = response.data.user._id

                                           const neworder = {

                                               itemId,
                                               itemprice,
                                               userID,
                                               fullName,
                                               Phone,
                                               address,
                                               district,
                                               province,
                                               postal

                                           }
                                               //send neworder object to backend to save the data
                                           axios.post("http://localhost:8090/order/orders", neworder).then((res) => {

                                               if (res.data == "true") {
                                                  // alert("success")
                                               } else {
                                                   alert("error")
                                               }

                                           }).catch((err) => {
                                               alert(err)
                                           })

                                       })
                                   })

                                   history.push("/success",{//navigate the payment_success page and send data
                                    name:fullName,
                                    phone:phone,
                                    address:address,
                                    district:district,
                                    province:province,
                                    postal:postal,
                                    total:finaltotal,
                                }) 

                           }

                       }).catch()
            }
            else {
                alert("pin incorrect")  // not matched ,will alert the error()
            }
        }, 2000)
    }



    //============================OTP TOGGLER================================
    //pass div tag html part as a first parameter and 
    //pass default visibility state as a second parameter  

    const [otpComponent, toggleOTPvisibility] = useVisibilityToggler(<div>

        <Grid container spacing={3}>

            <form>
                <Paper style={loginStyle} elevation={0} >
                    <Grid>
                        <TextField required id="outlined-basic" label="Insert OTP" variant="outlined" color="secondary" size="small" pattern="[0-9]" fullWidth required
                            onChange={(event) => {
                                validatePinNumber(event)
                            }} /> <br />

                        <Button type="submit" variant="contained" color="secondary" size="small" style={loginButton} fullWidth onClick={checkOTP} disabled={loadingOTP}>
                            Submit
                    {loadingOTP && <i className="fa fa-refresh fa-spin"></i>}
                        </Button>
                    </Grid>
                    <Grid>
                        <Typography style={{ fontWeight: 'bold', color: 'red', }} align="center">
                            {pinError}
                        </Typography>
                    </Grid>
                </Paper>
            </form>
        </Grid>

    </div>, false);


    //============================PHONE BILL TOGGLE================================
    //pass div tag html part as a first parameter and 
    //pass default visibility state as a second parameter  
    const [phoneCardComponent, toggle] = useVisibilityToggler(<div className="card" style={{
        borderRadius: '10px',
        padding: '25px',
        display: "inline-block",
        marginLeft: '15px',
        marginTop: '10px'
    }}>



        <Grid container spacing={3} align="center" justify="center" alignItems="center">



            <Paper style={loginStyle} elevation={11} >
                <Grid align="center">
                    <Typography variant="subtitle1" >Add Payment to Your Bill</Typography>
                </Grid>
                <Grid>
                    <img src={sim} style={{ width: "300px" }} />
                </Grid>
                <Grid>
                    <TextField id="outlined-basic" label="Phone Number" variant="outlined" color="secondary" size="small" fullWidth required pattern="[0-9]"
                        onChange={(event) => {
                            validateNumber(event)
                        }} /> <br />
                </Grid>
                <Grid>
                    <Typography variant="caption" style={{ fontWeight: 'bold', color: 'red', }} align="center">
                        {numberError}
                    </Typography> <br />
                    <Typography variant="caption" style={{ fontWeight: 'bold', color: 'blue', }} align="center">
                        Enter phone number without leading 0
                        </Typography>
                </Grid>
                <Grid>
                    <Button type="submit" variant="contained" color="secondary" size="large" style={loginButton} onClick={sendSms} disabled={loadingp} size="small">
                        Send OTP
                                {loadingp && <i className="fa fa-refresh fa-spin"></i>}
                    </Button>
                    {otpComponent}
                </Grid>
            </Paper>

        </Grid>

    </div>, false);



    //============================CARD PAYMENT TOGGLE================================

    const years = [
        {
            value: '2022',
            label: '2022',
        },
        {
            value: '2023',
            label: '2023',
        },
        {
            value: '2024',
            label: '2024',
        },
        {
            value: '2025',
            label: '2025',
        },
        {
            value: '2026',
            label: '2026',
        },
        {
            value: '2027',
            label: '2027',
        },
        {
            value: '2028',
            label: '2028',
        },
        {
            value: '2029',
            label: '2029',
        },
        {
            value: '2030',
            label: '2030',
        },
    ];

    const months = [
        {
            value: '01',
            label: '01',
        },
        {
            value: '02',
            label: '02',
        },
        {
            value: '03',
            label: '03',
        },
        {
            value: '04',
            label: '04',
        },
        {
            value: '05',
            label: '05',
        },
        {
            value: '06',
            label: '06',
        },
        {
            value: '07',
            label: '07',
        },
        {
            value: '08',
            label: '08',
        },
        {
            value: '09',
            label: '09',
        },
        {
            value: '10',
            label: '10',
        },
        {
            value: '11',
            label: '11',
        },
        {
            value: '12',
            label: '12',
        },
    ];

    const [currency, setCurrency] = React.useState('');

    const yearChange = (event) => {
        setCurrency(event.target.value);
        setYear(event.target.value);
    };

    const [month, setMonth] = React.useState('');

    const monthChange = (event) => {
        setMonth(event.target.value);
        setDate(event.target.value)
    };


    //pass div tag html part as a first parameter and 
    //pass default visibility state as a second parameter  

    const [gateway, toggle2] = useVisibilityToggler(<div style={{
        borderRadius: '10px',
        padding: '30px',
        display: "inline-block",
        marginTop: '10px',
        width: '400px'
    }}>

        <form onSubmit={sendData}>

            <Grid container spacing={2} align="center" justify="center" alignItems="center">



                <Paper style={loginStyle} elevation={11} fullWidth>
                    <Grid align="center">
                        <Typography variant="subtitle1" >Payment Details</Typography>
                    </Grid>
                    <Grid>
                        <FormControl component="fieldset">
                            <FormLabel component="legend">Card Type *</FormLabel>
                            <RadioGroup aria-label="userType" name="gender1"  >
                                <img src={visa} width="50px" />
                                <FormControlLabel value="visa" control={<Radio />} label="Visa" onChange={(event) => {
                                    setType(event.target.value)
                                }}></FormControlLabel>

                                <img src={master} width="50px" />
                                <FormControlLabel value="master" control={<Radio />} label="Master"
                                    onChange={(event) => {
                                        setType(event.target.value)
                                    }} />

                            </RadioGroup>
                        </FormControl>
                    </Grid>

                    <Grid>
                        <TextField id="outlined-basic" label="Card Number" variant="outlined" color="secondary" size="small" fullWidth required pattern="[0-9]"
                            onChange={(event) => {
                                setNumber(event.target.value)
                            }} /> <br />
                    </Grid>

                    <Grid>
                        <TextField
                            required
                            id="outlined-select-currency"
                            select
                            label="Year"
                            value={currency}
                            size="small"
                            onChange={yearChange}
                            variant="outlined"
                            style={{ marginTop: "5%", width: "100px" }}
                        >
                            {years.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Grid>

                    <Grid>
                        <TextField
                            required
                            id="outlined-select-currency"
                            select
                            label="Month"
                            value={month}
                            onChange={monthChange}
                            variant="outlined"
                            size="small"
                            style={{ marginTop: "5%", width: "100px" }}
                        >
                            {months.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Grid>

                    <Grid>
                        <TextField id="outlined-basic" label="CVV Number" variant="outlined" style={{ marginTop: "5%", width: "130px" }} color="secondary" size="small" fullWidth required pattern="[0-9]"
                            onChange={(event) => {
                                setCvc(event.target.value)
                                setPayable(finaltotal);
                            }} /> <br />
                    </Grid>
                    <Grid>
                        <Button type="submit" variant="contained" color="secondary" size="large" style={loginButton} disabled={loading} size="small">
                            Pay
                            {
                                loading && <i className="fa fa-refresh fa-spin"></i>}
                        </Button>

                        <Button variant="contained" color="secondary" size="large" style={loginButton} onClick={cancel} size="small">
                            Cancel
                        </Button>
                    </Grid>
                </Paper>

            </Grid>
        </form>


    </div>, false);


    //=====================return function============================

    return (

        <div>
            <NavBar />
            <Grid container spacing={3} align="center" justify="center" alignItems="center">

                <Paper elevation={2} style={paperStyle}>
                    <Grid align="left">
                        <Typography variant="h5" align="center" style={{ marginBottom: "5%", color: "#F83037", fontFamily: "Montserrat", fontWeight: "700" }}>Select your Payment Method</Typography>
                    </Grid>
                    <Grid>
                        <FormControl component="fieldset">
                            <RadioGroup aria-label="userType" name="payment">
                                <img src={cards} width="50px" />
                                <FormControlLabel value="card" control={<Radio />} label="Card Payment" onClick={toggle2} />
                                {gateway}

                                <img src={bill} width="50px" />
                                <FormControlLabel value="bill" control={<Radio />} label="Add to Phone Bill"
                                    onClick={toggle} onSuspend={toggle2} />
                                {phoneCardComponent}
                            </RadioGroup>

                        </FormControl>
                    </Grid>
                    <TotalPrice price={finaltotal} />

                </Paper>
            </Grid>
        </div>

    )

}




