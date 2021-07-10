// this componet is to display products details according to the buyer entering search text


import React, { useState, useEffect } from 'react';
import { Container, AppBar, Typography, Grow, Grid } from '@material-ui/core';
import buyer from "./images/buyer.jpg";
import EventPosts from './components/Posts/productlist';
import NavBar from './components/NavigationBar/NavBar';
import Styles from './styles';
import TextField from "@material-ui/core/TextField"
import { useDispatch } from 'react-redux';
import { getEvents, searchproduct } from './actions/eventPosts';
import { useHistory } from "react-router-dom";





const Search = () => {

    const history = useHistory() 
    if('token' in localStorage){    
    }else{
        alert("Invalid token")
        history.push('/')
    }


    const [currentId, setCurrentId] = useState(null);
    const [searchTerm, setSearchTerm] = useState(null);//a goble state to store serach value which is enter in the serach textfield

    const classes = Styles();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(searchproduct(searchTerm)); //use redux Usedispatch hook to dispatch searchproduct()  which is a  get request creator  in the './actions/eventPosts'

    }, [searchTerm, currentId, dispatch]);



    console.log(searchTerm)

    return (

        <Container maxwidth='lg'>
            <NavBar />
            <AppBar className={classes.appBar} position="static" color='inherit'>
            </AppBar>
        <br/>
        <br/>
          {/*  <div className={classes.search}>
                <input
                    type="text"
                    className="searchinput"
                    placeholder="Search"
                    name="searchTerm"
                    value={searchTerm}

                    onChange={(e) => { setSearchTerm(e.target.value) }}
                >

                </input>



            </div>
    */}

            <TextField
                        id="outlined-basic"
                        label="Search"
                        variant="outlined"
                        value={searchTerm}
                        size = "small"
                        onChange={(e) => { setSearchTerm(e.target.value) }}
                    />

            <Grow in>

                <Container>
                    <Grid container justify="space-between" alignItems="stretch" spacing={3}>

                        <Grid item xs={12} sm={7}>
                        </Grid>

                        <EventPosts setCurrentId={setCurrentId} />

                    </Grid>
                </Container>

            </Grow>


        </Container>


    );
}

export default Search;