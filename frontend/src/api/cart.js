// this js file contains all the api calls which are regarding to cart
import axios from 'axios';

//Get Cart details/ actions from backend

const urladd = 'http://localhost:8090/cart/add'; //api call for  add to cart details 
const urldelete = 'http://localhost:8090/cart/delete';

export const createCart =(newEvent)=>axios.post(urladd,newEvent);
export const deleteCart = (id)=>axios.delete(`${urldelete}/${id}`);