import React from 'react';
import CartComponent from './CartComponent';
import CartDetails from './cartDetails';
import TotalPriceCal from './TotalPriceCal';
import NavBar from '../NavigationBar/NavBar'
import CartCard from './Components/CartCard';
import { useHistory } from "react-router-dom";

function FullCart(){

    const history = useHistory() 
    if('token' in localStorage){    
    }else{
        alert("Invalid token")
        history.push('/')
    }


{/*Combine all separated components in the cart*/}
    return(<div>
        <NavBar />
        <CartComponent />
        <br />
        <br />
        <CartDetails />
        
    </div>)
}

export default FullCart;