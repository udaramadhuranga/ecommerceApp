
import React from 'react';

import {BrowserRouter as Router,Route} from "react-router-dom";
import Registration from "./pages/Registration/Registration";
import LoginPageComponent from "./pages/LoginPage/LoginPageComponent";
import product from './productmanage';
import productlist from './customerproduct'
import searchproduct from './searchproduct'
import cartDetails from './components/Cart/fullCart'
import Delivery from './pages/Delivery/Delivery'
import Myorders from './pages/Myorders/Order'
import payment from "./components/Payment/payment";
import paymentsuccess from "./components/Payment/Payment_success";
import Payment_failed from "./components/Payment/Payment_failed";



function shop(){

    return (
        
        <Router>
           
             <div>
                <Route path="/registration" exact component={Registration}/>  
                <Route path="/" exact component={LoginPageComponent}/>  
                <Route path="/product" exact component={product}/>
                <Route path="/productlist" exact component={productlist}/>
                <Route path="/productsearch" exact component={searchproduct}/>
				<Route path="/cart" exact component={cartDetails}/>
                <Route path="/delivery" exact component={Delivery}/>
                <Route path="/myorders" exact component={Myorders}/>


             
            
                <Route path="/payment" exact component={payment}/>
                <Route path="/success" exact component={paymentsuccess}/>
                <Route path="/failed" exact component={Payment_failed}/>

            
             </div>
        </Router>
    );
}

export default shop;