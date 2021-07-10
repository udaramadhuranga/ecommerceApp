import {combineReducers} from 'redux'

import eventPosts from './eventPosts'
import cartPosts from './cart'
import cartItems from "./cartItem"

export default combineReducers({ //combine all the indiviual reducers to use in creating globle store in productmanage.js

    eventPosts,
    cartPosts,
    allPosts: cartItems
}
    
);