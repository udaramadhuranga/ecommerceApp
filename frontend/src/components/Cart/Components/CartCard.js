import { Card, CardContent, makeStyles, Typography, IconButton, Grid } from '@material-ui/core';
import React from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import CartImage from "../../../images/cart.svg";

//CartCard component which store item details that added to the cart

const useStyles = makeStyles((theme)=>({
    cartItem: {
        width: '20%',
        height: 'auto',
        marginLeft:'2.5%',
        marginTop:'2%'
    },
    topicTy : {
        fontWeight: 700,
        fontSize:"17px",
        fontFamily: 'Montserrat',
        color: '#3A3A40'
    },
    price : {
        backgroundColor: "#ffebee",
        color: "#F83037",
        fontWeight: 900,
        fontFamily: 'Poppins',
        borderRadius: "7px",
        width:"75px",
        textAlign: "center",
        padding: '2% 5%'
    },
    cartDelete : {
        position: 'relative',
        left: '50%',
        bottom: '20%'
    },
    cartimg : {
        height: '400%',
        width: '400%',
        paddingTop: '100% !important' 
    }    
}));

function CartCard(props){

    const classes = useStyles();
    return(
        <Card className={classes.cartItem}>
            <Grid container spacing={3}>
            <Grid item xs={2} alignItems="center" justify="center">
                <CardContent>
                    <img src={CartImage} className={classes.cartimg}/>
                </CardContent>
            </Grid>
            <Grid item xs={6} sm = {6} >
                <CardContent>
                    <Typography className={classes.topicTy}>
                        {props.name}
                    </Typography>
                    <Typography style={{fontFamily:'Montserrat',color:'#707070',fontWeight: 700}}>
                        x1
                    </Typography>
                    
                </CardContent>
            </Grid>
            <Grid item xs={12} sm={4}>
                <CardContent>
                <IconButton edge="end" className={classes.cartDelete}>
                        <DeleteIcon onClick={props.clicking}  />
                </IconButton>
                <Typography className={classes.price} color="textPrimary">
                        Rs.{props.price}
                </Typography>
                
                   
                </CardContent>
            </Grid>
            </Grid>  
        </Card>
    )
}

export default CartCard;