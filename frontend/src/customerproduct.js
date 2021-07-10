//componet which is include   all the products displaying  component which is used by login Buyer .
//This componet display very first after Buyer's login sucessfull.
//in this componet  display all  products which are added by  all seller.

import React,{useState,useEffect} from 'react';
import {Container,AppBar,Typography,Grow,Grid} from '@material-ui/core';
import buyer from "./images/buyer.jpg";
import EventPosts from './components/Posts/productlist';
import NavBar from './components/NavigationBar/NavBar';
import Styles from './styles';
import {useDispatch} from 'react-redux';
import {getEvents,searchproduct} from './actions/eventPosts';
import { useHistory } from "react-router-dom";





const App =() =>{

   const history = useHistory() 
    if('token' in localStorage){    
    }else{
        alert("Invalid token")
        history.push('/')
    }
        

        const [currentId,setCurrentId] = useState(null);
        const [searchTerm,setSearchTerm]=useState(null);
        
        const classes = Styles();
        const dispatch =useDispatch();
        useEffect(()=>{
            dispatch(getEvents());         //use redux Usedispatch hook to dispatch getEvent() which is in the './actions/eventPosts'

        },[searchTerm,currentId,dispatch]);



        console.log(searchTerm)

    return (
        
            <Container maxwidth ='lg'>
                <NavBar/>
                <AppBar className ={classes.appBar} position ="static" color ='inherit'>
                </AppBar>
                <div className={classes.search}>
                </div>

                <Grow in>

                    <Container>
                        <Grid container justify ="space-between" alignItems="stretch" spacing ={3}>

                            <Grid item xs ={12} sm ={7}>
                                </Grid>

                                <EventPosts setCurrentId ={setCurrentId} />     


                                

                        </Grid>
                    </Container>

                </Grow>


            </Container>

           
    );
}

export default App;