import axios from "axios";
import * as api from '../api/cart';

export const fetchPost = (_ID)=>(dispatch)=>{
        axios.get("http://localhost:8090/cart",{params:{id:_ID}})
        .then(res=>{
            dispatch({
                type: "FETCH_BUTTON_CLICKED",
                payload: res.data
            })
        })
    }


export const selectPost=(post)=>{
    return{
        type: "SELECT_POST",
        payload: post
    }
};


/*
export const deleteCart = (id)=>(dispatch)=>{
    axios.delete("http://localhost:8090/cart/delete")
        .then(res=>{
            dispatch({
                type: "DELETE_ITEM",
                payload: res.data
            })
        })
}
*/

export const deleteCart = (id)=>(dispatch)=>{
    try {
        window.location.reload(false);
        api.deleteCart(id);
        dispatch({type:'DELETE_ITEM',payload:id});
    } catch (error) {
    
        console.log(error);
        
    }
}


