import { Card, CardContent, makeStyles, Typography } from '@material-ui/core';
import React from 'react';

//Total price component in cart page

const useStyles = makeStyles((theme)=>({
    cartItem: {
        position: 'fixed',
        bottom: '10%',
        right: '5%',
        width: '10%',
        height: 'auto',
        marginLeft:'2.5%',
        marginTop:'2%'
    },
    topicTy : {
        fontWeight: 700,
        fontSize:"17px",
        fontFamily: 'Montserrat',
        color: '#F83037'
    },
}))

function TotalPrice(props){
    const classes = useStyles();
    return(
        <Card className={classes.cartItem}>
            <CardContent>
                <Typography className={classes.topicTy}>
                    Total: Rs. {props.price}.00
                </Typography>
            </CardContent>
        </Card>
    )
}

export default TotalPrice;