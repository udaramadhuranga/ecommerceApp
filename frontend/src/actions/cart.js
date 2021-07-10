import * as api from '../api/cart';
//action creator fo post request reagarding cart
export const createCart= (post) => async(dispatch)=>{ //use redux thunk and async(dispatch) because of using asynchronized operation to post(save) all data and that needed to spend some  time
    try {

        const {data} = await api.createCart(post) //post data form the back end according to the api call

        dispatch({type:'CREATE',payload:data}); //type is used in switch in reducers
        
    } catch (error) {
        console.log(error.message)
    }
}
