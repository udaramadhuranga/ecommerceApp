import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import LoggedApp from './LoggedApp/LoggedApp';
import { colors } from '@material-ui/core';





const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
        color: '#0D0D0F',
        fontWeight: 500
    },
    title: {
        color: '#F83037',
        flexGrow: 1,
        fontWeight: 700
    },
    appbar: {
        backgroundColor: '#F5F5F5',
    },
    cart : {
        marginRight: theme.spacing(2),
    },
    cartButton : {
        '&:hover': {
            backgroundColor: '#F5F5F5',
        }
    }
}));

function NavBarLogin() {
    const classes = useStyles();
    return (
        <AppBar position="fixed" className={classes.appbar}>
            <Toolbar>
                <Typography variant="h6" className={classes.title}>
                    The Shop
                </Typography>
               
                <Button variant="contained" color="secondary" style={{color:"white", background:"#F83037", margin:"0 1%"}} href="/">Sign In</Button>
                <Button variant="contained" color="secondary" style={{color:"white", background:"#F83037"}} href="/registration">Sign Up</Button>
            </Toolbar>
        </AppBar>
    )
}

export default NavBarLogin;