//componet for product add  and edit form

import React,{useState,useEffect} from 'react';
import axios from "axios"
import Styles from './styles'
import {TextField,Button,Typography,Paper} from '@material-ui/core' //material elements  for the products form creation

import FileBase from 'react-file-base64'   //to covert images to match mongo db storing format
import {useDispatch,useSelector} from 'react-redux'
import {createEvent,updateEvent} from '../../actions/eventPosts'

const EventForm = ({currentId,setCurrentId})=>{ //getting the current selected Id which is set by the post component
    const classes = Styles();
    const dispatch = useDispatch(); //use to dispatch udateEvent and createEvent to handlesubmit function


    //user _id will assign to this userId
    const[userId, setUserID] = useState("")  

/*
response json data struture 
***************
data{
    
    user{
        _id:gfga,
        email:dgad,
        usertype:Seller/Buyer
    }
}

*/

//*********************************************************** 
    //get and store access token
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
//************************************************************




    const[postData,setPostData] =useState({  //globle state which store data  of the product post as a object
        product: '',description:'',price:"",seller:"",category:"",selectedfile:''

        
    }) 

    const eventpost =useSelector((state) =>currentId ? state.eventPosts.find((p)=>p._id ===currentId):null); /*if there is a curent selected id then form the 
    from the globle store get details of only the product which is has similar id to currentId 
*/

    useEffect(()=>{
            if(eventpost) setPostData(eventpost);
    },[eventpost])


    const handleSubmit =(e) =>{ //function which is include operations after submitting the form

        if(currentId){ // if there is a currentId , triggering action patch creator. if not triggeting post action creator
            dispatch(updateEvent(currentId,postData))//dispatch all the data which is in postData object in the globle state as patch request
            clear();
        }else{

        dispatch(createEvent(postData)) //dispatch all the data which is in postData object in the globle state as post request
        clear();
        }
    }

    const clear =()=>{ //function which is used in onclick of the clear button and after updating or adding to clear all the textfields
        currentId =null;
        setPostData({
            product: '',description:'',price:"",seller:"",category:"",selectedfile:''  
        })  
    }
// product form creating start form here...............
    //each value of the textfield is store in object in globle state
    return(

        <Paper className={classes.paper}>
            <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
            <Typography variant="h6">{currentId ? 'Edit' :'Add'} a MainEvent </Typography>
                <TextField name ='product' 
                variant="outlined"
                label="Product"
                fullWidth
                value={postData.product}
                onChange={(e) =>setPostData({...postData, product : e.target.value })}
                />


                <TextField name ='description' 
                variant="outlined"
                label="Description"
                fullWidth
                value={postData.description}
                onChange={(e) =>setPostData({...postData, description : e.target.value })}
                />

                <TextField name ='price' 
                variant="outlined"
                label="Price"
                fullWidth
                value={postData.price}
                onChange={(e) =>setPostData({...postData, price : e.target.value , seller : userId })}
                />

                
                {/* <TextField name ='seller' 
                variant="outlined"
                label={userId}
                fullWidth
                value={postData.seller}
                onChange={(e) =>setPostData({...postData, seller : userId })}
                /> */}


<TextField name ='category'

variant="outlined"
label="category"
fullWidth
value={postData.category}
onChange={(e) =>setPostData({...postData, category : e.target.value })}
                />


                <div className={classes.fileInput}>
                    <FileBase
                    
                    type ="file"
                    multiple ={false}
                    onDone ={({base64})=>setPostData({...postData,selectedfile:base64})}
                    
                    />

                    <Button className={classes.buttonSubmit} variant="contained" type="submit" color="primary" size ="large" fullWidth>
                      SUBMIT  </Button>

                      <Button variant="contained" color="secondary" size ="small"  onClick ={clear} fullWidth>
                      Clear  </Button>
                
                </div>
            </form>
            
        </Paper>
    )
}

export default EventForm;