//componet which is post a single product which added by  the login seller  

import React,{useState,useEffect} from 'react'
import Styles from './style'
import {Card,CardActions,CardContent,CardMedia,Button,Typography } from '@material-ui/core';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz'
import {useDispatch}  from 'react-redux';
import {deleteEvent} from '../../../actions/eventPosts'





const EventPost = ({post,setCurrentId,userId})=>{ //set currentId to update purpose
    const classes = Styles();
    const EventDispatch = useDispatch();


    

     
    

    console.log(userId);
    console.log(post.seller);
    
    
    
        //design a getting product details in to a material card
        // in MoreHorizIcon button onclick function set selected product id to setcurrentId which is must sent to eventform component to load product details to update purpose

        
    return(

        
        

        <Card className={classes.card}  >



<CardMedia className={classes.media}  image ={post.selectedfile} title={post.product} />

<div className={classes.overlay}>
    
    <Typography variant="h6">Product :{post.product}</Typography>
    <Typography variant="h6">Category:{post.category}</Typography>


</div>
<div className={classes.overlay2}>

    <Button style={{color:'white'}} size='small' onClick={()=>setCurrentId(post._id)}>
        <MoreHorizIcon fontSize = "default" />


    </Button>

</div>


<CardContent>
<Typography variant="h5" color="textPrimary">Price : Rs. {post.price}</Typography>
<Typography  variant="body2" color="textSecondary" gutterBottom>Desciption: {post.description}</Typography>
</CardContent>

            <CardActions className= {classes.cardActions}> 

                <Button size ="small" color="primary" onClick={()=>EventDispatch(deleteEvent(post._id),window.location.reload(false))} >

                    
                    Delete

                    
                </Button>
            </CardActions>



        </Card>
    )
        
}

export default EventPost;