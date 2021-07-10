//this js file contain all the acions creators wg=hich  should  return actions  for api calls regarding products 
import * as api from '../api/event';
//action creator which is used to get all product details
export const getEvents = ()=>async(dispatch)=>{ //use redux thunk and async(dispatch) because of using asynchronized operation to featch all data and that needed to spend some time

    try{
        const {data} =await api.fetchEvents(); //featch data form the back end according to the api call
      //dispatch the action instead returning  because of using redux thunk 
        dispatch ({type:'FETCH_ALL',payload:data});  //type is used in switch in reducers,payload is data stored in product
    }catch (error){
        console.log(error);
    }

    
}

//action creator fo post request reagarding products
export const createEvent= (post) => async(dispatch)=>{ //use redux thunk and async(dispatch) because of using asynchronized operation to post(save) all data and that needed to spend some  time
    try {

        const {data} = await api.createEvent(post) //post data form the back end according to the api call

        dispatch({type:'CREATE',payload:data}); //type is used in switch in reducers
        
    } catch (error) {
        console.log(error.message)
    }
}

//action creator fo patch request reagarding products
export const updateEvent =(id,post) => async(dispatch)=>{
    try {

        const {data}  =await api.updateEvent(id,post);
        dispatch({type:'UPDATE',payload:data})

        
    } catch (error) {
        console.log(error)
    }
}

//action creator fo delete request reagarding products
export const deleteEvent =(id)=>async(dispatch)=>{
try {
    await api.deleteEvent(id);
    dispatch({type:'DELETE',payload:id});

} catch (error) {

    console.log(error);
    
}

}

//action creator for get  request reagarding products.in here dipatch action is getting product which are added by a certain seller
export const getseller = (id)=>async(dispatch)=>{

    try{
        const {data} =await api.fetchseller(id);
        dispatch ({type:'FETCH_ALL',payload:data});
    }catch (error){
        console.log(error);
    }

    
}

//action creator for get  request reagarding products.in here dipatch action is getting product which are search by a buyer
export const searchproduct = (id)=>async(dispatch)=>{

    try{
        const {data} =await api.fetchproduct(id);
        dispatch ({type:'FETCH_ALL',payload:data});
    }catch (error){
        console.log(error);
    }

    
}