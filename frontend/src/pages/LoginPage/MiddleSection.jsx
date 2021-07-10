import React, { useState } from 'react';
import axios from "axios"
import { useHistory } from "react-router-dom";
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { Button, Paper, Typography } from '@material-ui/core';
import backgroundImage from '../../images/backgroud.svg';
import NavBarLogin from '../../components/NavigationBar/NavBarLogin';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';

const loginStyle = {
    width: '50%',
    heigth: 'auto',
    padding: '20% 10% 0%',
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
    position: 'absolute',
    fontFamily: 'Montserrat',
    bottom: '5%',
    color: '#707070',
    width: '500px'
}

const imageStyle = {
    width: '100%',
}

function MiddleSection() {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const type = "guest"
    const history = useHistory()

    function login(e) {
        e.preventDefault();
        //create user JSON object 
        const oldUser = {
            email,
            password
        }
        //calling and passing user object using POST method

        axios.post("http://localhost:8090/user/login", oldUser).then((response) => {
            if (response.data.message) {
                alert(response.data.message); // showing alert if there is a message
            } else {
                localStorage.setItem("token", response.data.token) //store token in localstorage for future use
                document.getElementById("myForm").reset();// resetting form

                //redirecting accourding to the user type
                if (response.data.usertype == "Seller") {
                    history.push("/product")
                } else {
                    history.push("/productlist")
                }
            }
        }).catch((err) => {
            alert(err)
        })
    }

    return (
        <div>
            <NavBarLogin />
            <div className="container">

                <Grid container spacing={3}>

                    <Grid item xs={6}>
                        <img src={backgroundImage} style={imageStyle} />
                    </Grid>
                    <Grid item xs={6} align="center">
                        <form id="myForm">
                            <Paper style={loginStyle} elevation={0} >
                                <Grid align="left">
                                    <Typography variant="h3" style={txtTitle}>Hello, <br />Welcome Back</Typography>
                                </Grid>
                                <Grid>
                                    <TextField id="outlined-basic" label="Email" variant="outlined" color="secondary" style={textFieldStyle} fullWidth
                                        onChange={(event) => {
                                            setEmail(event.target.value)
                                        }} /> <br />
                                    <TextField id="outlined-basic" label="Password" type="password" color="secondary" style={textFieldStyle} variant="outlined" fullWidth onChange={(event) => {
                                        setPassword(event.target.value)
                                    }} /><br />

                                    <Button type="submit" variant="contained" color="secondary" size="large" style={loginButton} fullWidth onClick={login}>Sign In</Button>
                                    
                                </Grid>
                                <Grid>
                                    <Typography style={registerButton} align="center">Don't you have an account?
                    <a href="/registration" style={{ textDecoration: 'none', fontWeight: 500, color: '#F83037', marginLeft: "2%" }}>
                                            Sign Up
                    </a>
                                    </Typography>
                                </Grid>
                            </Paper>
                        </form>
                    </Grid>
                </Grid>



                {/* <h1> Login </h1>
            <form id="myForm">
                <div className="form-group">
                    <label htmlFor="fname" className="form-label">Email</label>
                    <input type="text" className="form-control" id="name" placeholder="Enter Email"
                           onChange={(event)=>{
                               setEmail(event.target.value)
                           }}/>

                </div>

        

                <div className="form-group">
                    <label htmlFor="age" className="form-label">Password</label>
                    <input type="password" className="form-control" id="pass" placeholder="Enter Password"
                           onChange={(event)=>{
                               setPassword(event.target.value)
                           }}/>

                </div>
                <br/>

                <button type="submit" className="btn btn-primary" onClick={login}>Login</button>
                        </form> */}

            </div>
        </div>
    );
}

export default MiddleSection;