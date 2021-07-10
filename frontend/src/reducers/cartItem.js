export default (cartPosts=[],action) =>{
    switch (action.type){
        case "FETCH_BUTTON_CLICKED":
            return action.payload;
            break;
        case 'DELETE_ITEM':
            return cartPosts.filter((post)=>post._id !== action.payload._id );
            break;
    }
    return cartPosts;
}