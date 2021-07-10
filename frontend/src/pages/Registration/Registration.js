import React, { useState } from "react";

import axios from "axios";

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
import NavBarLogin from '../../components/NavigationBar/NavBarLogin';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { useHistory } from "react-router-dom";
import { validate } from "react-email-validator";
import validator from 'validator'

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        '& > * + *': {
            marginTop: theme.spacing(2),
        },
    },
}));

const loginStyle = {
    width: '50%',
    heigth: 'auto',
    padding: '15% 10% 0%',
    backgroundColor: 'transparent',

}
const textFieldStyle = {
    marginBottom: '5%'
}

const loginButton = {
    margin: '10% 0 5%',
    backgroundColor: '#F83037'
}
const txtTitle = {
    marginBottom: '20%',
    fontWeight: 600,
    fontFamily: 'Montserrat',
    color: '#707070'
}

const registerButton = {
    fontFamily: 'Montserrat !important',
    color: '#707070',
    width: '500px'
}

const imageStyle = {
    width: '100%',
}

function Registraion() {

    const history = useHistory()
    const [value, setValue] = React.useState();
    const handleChange = (event) => {
        setValue(event.target.value);
    };

    //storing values  

    const [username, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [usertype, setUser] = useState("")
    const [check, setCheck] = useState("")
    const [erremail , setErrEmail] = useState("")
    const [errpassword, setErrPassword] = useState('')
    const [erruser, setErrUser] = useState("")

    const classes = useStyles();

    function register(e) {

        e.preventDefault();
        //user object to send to the backend
        const newUSer = {
            username,
            email,
            password,
            usertype

        }

        //validation
        if(!username){
            setErrUser("User name required")
            return
        }
        else if(erremail == "Email not valid"){
            return
        }
        else if(errpassword != ""){  
            return
        }
        else if (check != "true") {
            alert("accept terms and conditions")
        } else {
            //passing values to the backend through POSt method 
            axios.post("http://localhost:8090/user/register", newUSer).then((response) => {
                if (response.data.Error) {
                    alert(response.data.Error)
                    document.getElementById("myForm").reset();                   
                } else {                  
                    document.getElementById("myForm").reset();
                    history.push('/')                   
                }
            }).catch((err) => {
                alert(err)
            })
        }
    }
    return (
        <div>

            <NavBarLogin />
            <Grid container className={classes.root} spacing={3}>
                <Grid item xs={6}>

                    <form id="myForm">
                        <Paper style={loginStyle} elevation={0}>
                            <Grid align="left">
                                <Typography variant="h3" style={txtTitle}>Hello, <br />Welcome To Shop</Typography>
                            </Grid>
                            <Grid>
                                <TextField id="outlined-basic" label="User Name"  variant="outlined" color="secondary" style={textFieldStyle} fullWidth
                                    onChange={(event) => {
                                        setName(event.target.value)
                                        if(!username){
                                            setErrUser("User name required")
                                        }else{
                                            setErrUser("")
                                        }
                                    }} />
                                    <span style={{
                                 fontWeight: 'bold',
                                 color: 'red',
                                 }}>{erruser}</span>
                                     <br/>
                                      <br />
                                <TextField id="outlined-basic" label="Email"  variant="outlined" color="secondary" style={textFieldStyle} fullWidth
                                    type="text" className="form-control" id="emaill" placeholder="Enter Email"
                                    onChange={(event) => {

                                        if(validate(event.target.value) == true){
                                            setEmail(event.target.value)
                                            setErrEmail("")
                                        }else{
                                            setErrEmail("Email not valid")
                                        }
                                    }} />
                                    <span style={{
                                 fontWeight: 'bold',
                                 color: 'red',
                                 }}>{erremail}</span>
                                     <br/>
                                     <br />
                                <TextField id="outlined-basic" label="Password" type="password" color="secondary" style={textFieldStyle} variant="outlined" fullWidth onChange=
                                {(event) => {                                   
                                    if (validator.isStrongPassword(event.target.value, {
                                        minLength: 4, minLowercase: 1,
                                        minUppercase: 1, minNumbers: 1, minSymbols: 1
                                    })) {
                                        setPassword(event.target.value)
                                        setErrPassword('')
                                    } else {
                                        setErrPassword('Your password must contain atleast 1 lowercase, 1 uppsecase, 1 symbol, 1 number')
                                    }
                                    
                                }} />
                                <span style={{
                                 fontWeight: 'bold',
                                 color: 'red',
                                 }}>{errpassword}</span>
                                <br />
                                <br/>
                                <FormControl component="fieldset">
                                    <FormLabel component="legend">User Type</FormLabel>
                                    <RadioGroup aria-label="userType" name="gender1" value={value} onChange={handleChange}>

                                        <FormControlLabel value="Buyer" control={<Radio />} label="Buyer" onChange={(event) => {
                                            setUser(event.target.value)
                                        }} />

                                        <FormControlLabel value="Seller" control={<Radio />} label="Seller"
                                            onChange={(event) => {
                                                setUser(event.target.value)
                                            }} />

                                    </RadioGroup>
                                </FormControl> <br />

                                <FormControl component="fieldset">
                                    <FormGroup aria-label="position" row>
                                        <FormControlLabel

                                            control={<Checkbox color="secondary" onChange={(event) => {
                                                setCheck(event.target.value)
                                            }} />}
                                            label="I agreed terms and conditions."
                                            labelPlacement="end"
                                            style={registerButton}
                                            value="true"
                                        />
                                    </FormGroup>
                                </FormControl>


                                <Button type="submit" variant="contained" color="secondary" size="large" style={loginButton} fullWidth onClick={register}>Sign Up</Button>

                            </Grid>
                        </Paper>
                    </form>

                </Grid>
                <Grid item xs={6} align="center">
                    <img src={backgroundImage} style={imageStyle} />
                </Grid>
            </Grid> 
        </div>
    )
}

export default Registraion;
