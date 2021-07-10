//componet which is post a single product which is displayed to  the login Buyer 

import React, { useState, useEffect } from 'react'
import Styles from './style'
import { Card, CardActions, CardContent, CardMedia, Button, Typography } from '@material-ui/core';
import { createCart } from '../../../actions/cart'
import axios from 'axios';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch } from 'react-redux';

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
}));





const ProductPost = ({ post }) => {
    const classes = Styles();
    const EventDispatch = useDispatch();

    const [userId, setUserID] = useState("")

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
        .then((response) => {
            if (response.data.message) {
                alert(response.data.message)
            } else {

                //assigning user _id to userId  
                //if you want email or usertype you can call response.data.user.email or response.data.user.usertype
                setUserID(response.data.user._id)

            }

        })
        .catch()



    const [open, setOpen] = React.useState(false);

    const handleClick = () => {
        setOpen(true);
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };


    return (
        <Card className={classes.card}>

            <CardMedia className={classes.media} image={post.selectedfile} title={post.product} />

            <div className={classes.overlay}>

                <Typography variant="h6">Product :{post.product}</Typography>
                <Typography variant="h6">Category:{post.category}</Typography>


            </div>


            <CardContent>
                <Typography variant="h5" color="textPrimary">Price : Rs. {post.price}</Typography>
                <Typography variant="body2" color="textSecondary" gutterBottom>Desciption: {post.description}</Typography>
            </CardContent>

            <CardActions className={classes.cardActions}>

                <Button size="small" color="primary" onClick={() => { console.log(post) }} >





                </Button>

                <Button size="small" color="primary" onClick={() => {

                    const products = {
                        productId: post._id, product: post.product, description: post.description, price: post.price, seller: post.seller, customerID: userId
                    }


                    EventDispatch(createCart(products));
                    console.log(products);


                }}>


                    <ShoppingCartIcon color="error" fontSize="large" onClick={handleClick} />
                    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose} autoHideDuration={1000} anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right',
                    }}>
                        <Alert onClose={handleClose} severity="success">
                            Added to cart.
                        </Alert>
                    </Snackbar>


                </Button>

            </CardActions>




        </Card>


    )
}

export default ProductPost;