import React, { Component } from 'react';
import Badge from '@material-ui/core/Badge';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    cart : {
        marginRight: theme.spacing(0),
    },
}));

/*
class CartBadge extends Component{

    constructor(){
        super();
        this.state={}
    }

    render(){
        const classes = useStyles();
    return(
            <Badge badgeContent={2} color="secondary">
                <ShoppingCartIcon className={classes.cart} />
            </Badge>
        );
    }
}*/

var items;

function CartBadge(){
    const classes = useStyles();
    console.log(items);
    
    return (
        <Badge badgeContent={1} color="secondary">
            <ShoppingCartIcon className={classes.cart}/>
        </Badge>
    )
}

export default CartBadge;