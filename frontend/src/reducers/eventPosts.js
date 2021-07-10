//this js file is the product manage reducer
//reducer is basically a function which accept state and a action 
//based on the action type  it return  a action or return a state  


export default (eventPosts=[],action) =>{ //because of  in eventPost(reducer of the productmanage ) state is going to be eventPost and initially it should be null
    switch (action.type){
        case 'FETCH_ALL':
            return action.payload;

        case 'CREATE':
            return [...postMessage,action.payload];

            case 'UPDATE':
            return eventPosts.map((post)=>post._id === action.payload._id ? action.payload:post);

            case 'DELETE':
                return eventPosts.filter((post)=>post._id !== action.payload._id );


        default:
            return eventPosts;

    }
}