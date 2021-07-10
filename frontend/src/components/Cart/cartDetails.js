import React, { Component, useState } from 'react';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import {selectPost, deleteCart} from '../../actions/productAction';
import CartCard from './Components/CartCard'
import CircularProgress from '@material-ui/core/CircularProgress';
import Delivery from '../../pages/Delivery/Delivery'
import {Link} from 'react-router-dom';
import TotalPrice from './Components/TotalPrice';
import Button from '@material-ui/core/Button';

const buttonStyle = {
    position: 'fixed',
    bottom: '5%',
    right: '5%',
    width: '7.5%'
}

class cartDetails extends React.Component{

    constructor(props){
        super(props);
        this.state={}
        this.routeChange = this.routeChange.bind(this);
        this.items = {productid: [],itemprice: []}
       
    }

    /*Push products that added to cart to history*/
    routeChange() {
        let path = `newPath`;
        this.props.history.push(path);
      }

      /*Show all product in the cart*/
    createListItems(){
        //let cart = {product: [],total: 0}
        return this.props.allPost.map((item)=>{
           // this.setState({itemid: this.state.lists.concat(item.id)})
           this.items.productid.push(item.productId)
           this.items.itemprice.push(item.price)
            return(<div>
                {/*Pass data to CartCard component. It shows all product one by one on cart */}
               <CartCard 
                    key={item.id}
                    name = {item.product}
                    description = {item.description}
                    price = {item.price}
                    clicking = {deleteCart(item._id)}  
               />
               
                </div>
                
            );
            
        });
    }
    
    /*Calculate total price of products that in cart*/
    totalPrice(){
        let cart = {product: [],total: 0}
        
        this.props.allPost.map((item)=>{

            cart.product.push(item.price);
           
            this.total =  cart.product.reduce(function(acc, val) { return acc + val; }, 0);
              
        });
        return(
 
        <div> 
            {/*Pass data to Total price component. It shows total price on Cart page*/}
            <TotalPrice price = {this.total} />

            {/*
            <ul>
                {this.items.productid.map((itemid)=><li>{itemid}</li>)}
            </ul>
            <ul>
                {this.items.itemprice.map((price)=><li>{price}</li>)}
            </ul>
            */}
                {/*Pass product id, product price and total price to delivery page after pressing Pay button.*/}
                <Link style={{textDecoration:'none', color:'white'}} to={{
                    pathname:'/delivery',
                    state:{
                        total:this.total,
                        itemID: this.items.productid,
                        itemPrice: this.items.itemprice
                    }
                        }}>
                        <Button size="large" color="secondary" variant="contained" style={buttonStyle}>
                            Pay
                        </Button>
                </Link>
            </div>
        );
    }


    render(){
        if(!this.props.allPost){
            return(<CircularProgress />);
        }

        
        return(
            <ul>
                {this.createListItems()}
                {this.totalPrice()}  
            </ul>
        );
    }
}

function mapStateProps(state){
    return{
        allPost: state.allPosts
    }
}

function matchDispatchToProps(dispatch){
    return bindActionCreators({selectPost: selectPost}, dispatch);
}

export default connect(mapStateProps,matchDispatchToProps) (cartDetails);



