//componet which is include both product add form componet  and all the products post component which is used by login seller .
//This componet display very first after seller's login sucessfull.
//in this componet only display products which are added by the login seller(sessions works here)

import React,{useState,useEffect} from 'react';
import {Container,AppBar,Typography,Grow,Grid} from '@material-ui/core';
import mainevents from "./images/seller2.jpg";
import EventPosts from './components/Posts/eventPosts';
import EventForm from './components/Forms/eventForm';
import Styles from './styles';
import {useDispatch} from 'react-redux';
import {getseller} from './actions/eventPosts';
import axios from 'axios';
import NavBarSeller from './components/NavigationBar/NavBarSeller';
import { useHistory } from "react-router-dom";






const App =() =>{

    const history = useHistory() 
    if('token' in localStorage){    
    }else{
        alert("Invalid token")
        history.push('/')
    }

    
        const [currentId,setCurrentId] = useState(null);// a golble state to store id of a selected  product 
        /*currentId is used in  golble state because to update product details user first should click the  MoreHorizIcon in the card where
        designed in post component and once click the id of clicked product details should load to the product form which is in product form.
        so this id is set in the post componest and passe to eventform componet.
        in below you can see it clearly passed and set id in the component calling points. 
        */


        const[userId, setUserID] = useState(null)  // a golble state to store id of the login seller


         
        const access_token = localStorage.getItem('token')
        //header create
        let config = {      //Bearer 74dgs5hgs+6f5hs5hfs
            headers: {
              'Authorization': 'Bearer ' + access_token
            }
        }
        //pass accesstoken and get the user details as json
        axios.get( 
            'http://localhost:8090/user/post',
            config)
          .then( ( response ) => {
            if(response.data.message){
                alert(response.data.message)  
            }else{
                
                //assigning user _id to userId  
                //if you want email or usertype you can call response.data.user.email or response.data.user.usertype
                setUserID(response.data.user._id)
    
            }   
    
          } )
          .catch()



          console.log(userId)






        
        const classes = Styles();
        const dispatch =useDispatch();
        useEffect(()=>{
            
            dispatch(getseller(userId));  //use redux Usedispatch hook to dispatch getseller() which is in the './actions/eventPosts'
            

        },[userId,currentId,dispatch]);

    return (
        
            <Container maxwidth ='lg'>
                <NavBarSeller/>

                <AppBar className ={classes.appBar} position ="static" color ='inherit'>

                    
                </AppBar>

                <Grow in>

                    <Container>
                        <Grid container justify ="space-between" alignItems="stretch" spacing ={3}>

                            <Grid item xs ={12} sm ={7}>
                                </Grid>

                                <EventPosts setCurrentId ={setCurrentId} userId={userId}   />     


                                <Grid item xs ={12} sm ={4}>
                                    <EventForm  currentId={currentId} />
                                </Grid>

                        </Grid>
                    </Container>

                </Grow>


            </Container>

           
    );
}

export default App;