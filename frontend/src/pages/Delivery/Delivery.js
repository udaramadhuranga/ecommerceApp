import React, { useState } from "react";
import axios from "axios"
import { useHistory } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { Button, Paper, Typography } from '@material-ui/core';
import backgroundImage from '../../images/backgroud.svg';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import FormGroup from '@material-ui/core/FormGroup';
import Checkbox from '@material-ui/core/Checkbox';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import NavBar from '../../components/NavigationBar/NavBar';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        '& > * + *': {
            marginTop: theme.spacing(2),
        },
    },
    topicTy : {
        fontWeight: 700,
        fontSize:"17px",
        fontFamily: 'Montserrat',
        color: '#F83037'
    },
}));


const loginStyle = {
    width: '20%',
    heigth: 'auto',
    padding: '2.5% 5%',
    marginTop: '5%'

}
const textFieldStyle = {
    marginBottom: '2.5%'
}

const loginButton = {
    margin: '5% 0 5%',
    backgroundColor: '#F83037'
}
const txtTitle = {
    fontWeight: 600,
    fontFamily: 'Montserrat',
    color: '#707070',
    marginBottom: '5%'
}


function Delivery(props) {

    const history = useHistory();

    if('token' in localStorage){    
    }else{
        alert("Invalid token")
        history.push('/')
    }

    let total = props.location.state.total
    const [value, setValue] = React.useState();
    const [open, setOpen] = React.useState(false);


    const handleChange = (event) => {
        setValue(event.target.value);
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };
    

    const [fullname, setFullname] = useState("")
    const [phone, setPhone] = useState("")
    const [address, setAddress] = useState("")
    const [district, setDistrict] = useState("")
    const [province, setProvince] = useState("")
    const [postal, setPostal] = useState("")
    const [delivery, setDelivery] = useState("");

    const [errfullname, setErrFullname] = useState("")
    const [errphone, setErrPhone] = useState("")
    const [erraddress, setErrAddress] = useState("")
    const [errdistrict, setErrDistrict] = useState("")
    const [errprovince, setErrProvince] = useState("")
    const [errpostal, setErrPostal] = useState("")
    const [errdelivery, setErrDelivery] = useState("");

    const classes = useStyles();
    getTotal()
    function getTotal() {

        //calculating total according to the delivery type
        if (delivery == "slow") {
            total = total + total * 5 / 100
        } else if (delivery == "fast") {
            total = total + total * 10 / 100
        } else {
            total = total
        }
    }

    function submit(e) {

        e.preventDefault()

    //simple validations
        if(!fullname){
            setErrFullname("Full name required")
            return
        }else if(!phone){
            setErrPhone("Phone number is required")
            return
        }else if(!address){
            setErrAddress("Address required")
            return
        }else if(!district){
            setErrDistrict("District required")
            return
        }else if(!province){
            setErrProvince("Province required")
            return
        }else if(!postal){
            setErrPostal("Postal Code required")
            return
        }else if(!delivery){
            alert("Select delivery method")
            return
        }else{     
            //sending user details to another page for futher use
            history.push('/payment', {
                name: fullname,
                phone: phone,
                address: address,
                district: district,
                province: province,
                postal: postal,
                total: total,
                itemid: props.location.state.itemID,
                itemPrice: props.location.state.itemPrice
            })
        }
    }

    return (
        <div>
            <br/>
            <NavBar />
            <form id="myForm">
                <Grid container className={classes.root} spacing={3} container justify="center">


                    <Paper style={loginStyle} elevation={2} >
                        <Grid align="left">
                            <Typography variant="h5" style={txtTitle} align="center">Enter Delivery Details</Typography>
                        </Grid>
                        <Grid>
                            <TextField id="outlined-basic" label="Full name" variant="outlined" size="small" color="secondary" style={textFieldStyle} fullWidth
                                onChange={(event) => {
                                    setFullname(event.target.value)

                                    if(!fullname){
                                        setErrFullname("Full name required")
                                    }else{
                                        setErrFullname("")
                                    }

                                }} /><span style={{
                                    fontWeight: 'bold',
                                    color: 'red',
                                    }}>{errfullname}</span>
                                         <br />

                            <TextField id="outlined-basic" label="Phone number" variant="outlined" size="small" placeholder="Ex- 07XXXXXXXX" color="secondary" style={textFieldStyle} fullWidth
                                type="text" className="form-control" id="emaill"
                                onChange={(event) => {
                                    setPhone(event.target.value)

                                    var pattern = new RegExp(/^[0-9\b]+$/);

                                    if (!pattern.test(phone)) {               
                                        setErrPhone("Please enter only number.")

                                    }else if(phone.length != 9){
                                        setErrPhone("Please enter valid phone number.")

                                    }else{
                                        setErrPhone("")
                                    }

                                }} /><span style={{
                                    fontWeight: 'bold',
                                    color: 'red',
                                    }}>{errphone}</span>
                                          <br />

                            <TextField id="outlined-basic" label="Address" size="small" color="secondary" style={textFieldStyle} variant="outlined" fullWidth onChange={(event) => {
                                setAddress(event.target.value)
                                if(!address){
                                    setErrAddress("Address required")
                                }else{
                                    setErrAddress("")
                                }

                            }} /><span style={{
                                fontWeight: 'bold',
                                color: 'red',
                                }}>{erraddress}</span><br />

                            <TextField id="outlined-basic" label="District" size="small" color="secondary" style={textFieldStyle} variant="outlined" fullWidth onChange={(event) => {
                                setDistrict(event.target.value)
                                if(!district){
                                    setErrDistrict("District required")
                                }else{
                                    setErrDistrict("")
                                }
                            }}
                            /><span style={{
                                fontWeight: 'bold',
                                color: 'red',
                                }}>{errdistrict}</span><br />

                            <TextField id="outlined-basic" label="Province" size="small" color="secondary" style={textFieldStyle} variant="outlined" fullWidth onChange={(event) => {
                                setProvince(event.target.value)
                                if(!province){
                                    setErrProvince("Province required")
                                }else{
                                    setErrProvince("")
                                }
                            }} /><span style={{
                                fontWeight: 'bold',
                                color: 'red',
                                }}>{errprovince}</span><br />

                            <TextField id="outlined-basic" label="Postal Code" size="small" placeholder="XXXXXX" color="secondary" style={textFieldStyle} variant="outlined" fullWidth onChange={(event) => {
                                setPostal(event.target.value)


                                var pattern = new RegExp(/^[0-9\b]+$/);

                                if (!pattern.test(postal)) {               
                                    setErrPostal("Please enter only numbers")

                                }else if(postal.length != 5){
                                    setErrPostal("Please enter valid postal code")

                                }else{
                                    setErrPostal("")
                                }
                            }} /><span style={{
                                fontWeight: 'bold',
                                color: 'red',
                                }}>{errpostal}</span><br />
                            <FormControl component="fieldset">
                                <FormLabel component="legend">Delivery Type</FormLabel>
                                <RadioGroup aria-label="userType" name="gender1" value={value} onChange={handleChange}>

                                    <FormControlLabel value="no" control={<Radio />} label=" Cash on Delivery" onChange={(event) => {
                                        setDelivery(event.target.value)
                                    }} />
                                    <Typography variant="caption" style={txtTitle} align="center">You can pay delivery charges afteryou get the item</Typography>

                                    <FormControlLabel value="slow" control={<Radio />} label="Slow delivery"
                                        onChange={(event) => {
                                            setDelivery(event.target.value)
                                        }}
                                    />
                                    <Typography variant="caption" style={txtTitle} align="center">Yo can pay delivery charges now. Items will deliver within 5-7 days.</Typography>

                                    <FormControlLabel value="fast" control={<Radio />} label="Fast delivery"
                                        onChange={(event) => { setDelivery(event.target.value) }} />
                                    <Typography variant="caption" style={txtTitle} align="center">Items will deliver within 48 hours</Typography>

                                </RadioGroup>
                            </FormControl> <br />

                            <Typography className={classes.topicTy}>
                                Total: Rs. {Math.floor(total)}.00
                                
                            </Typography>


                            <Button type="submit" variant="contained" color="secondary" size="large" style={loginButton} onClick={submit}>Submit</Button>
                            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                                <Alert onClose={handleClose} severity="success">
                                    This is a success message!
        </Alert>
                            </Snackbar>

                        </Grid>
                    </Paper>
                </Grid>
            </form>
        </div>
    )
}

export default Delivery;