//component for all  products display which is used by the sellers

import React from 'react';
import Posts from './Post/post'
import{useSelector} from 'react-redux' //use to get all data regarding product form the goloble store which is dispatch from the eventPost reducers
import {Grid,CircularProgress} from '@material-ui/core'

import Styles from './styles'


const EventPosts = ({setCurrentId,userId})=>{  //props drilling .send setcurrentId to post componet which is child component requested by the parent component productmanage 
    const eventposts = useSelector((state)=>state.eventPosts) //implement useselector as a react hook
    const classes = Styles();
    console.log(eventposts);

//if getting products are 0 then a circular progress run in the client web application
//if not those products are display in the client page
// inside the first grid loop all the getting post to display by using a map

    return(
        
        !eventposts.length ? <CircularProgress /> : (

            

            <Grid className={classes.container} container alignItems ="stretch" spacing={3}>
                {
                    eventposts.map((post)=>(
                        <Grid key={post._id} item xs={12} sm={4}>

                            <Posts  post={post} setCurrentId={setCurrentId} userId={userId}/>
                        
                        </Grid>

                    ))}

            </Grid>
        )

        
    )
    
}

export default EventPosts;