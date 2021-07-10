// this js file contains all the api calls which are regarding to products

import axios from 'axios';


const urlget = 'http://localhost:8090/products/readAll';
const urladd = 'http://localhost:8090/products/add';
const urlupdate = 'http://localhost:8090/products/update';
const urldelete = 'http://localhost:8090/products/delete';
const urlread = 'http://localhost:8090/products/read';
const urlsearch = 'http://localhost:8090/products/search';

export const fetchEvents =()=>axios.get(urlget); // this js file contains all the api calls which are regarding to products
export const createEvent =(newEvent)=>axios.post(urladd,newEvent); //api call for  add product details 
export const updateEvent = (id,updateEvent)=>axios.patch(`${urlupdate}/${id}`,updateEvent); //api call for  update product details 
export const deleteEvent = (id)=>axios.delete(`${urldelete}/${id}`); //api call for  delete product details

export const fetchseller =(_ID)=>axios.get(urlread,{params:{id:_ID}}); //api call for  fetch product details which are added by a certain seller 

export const fetchproduct =(_ID)=>axios.get(urlsearch,{params:{id:_ID}}); //api call for  search products




