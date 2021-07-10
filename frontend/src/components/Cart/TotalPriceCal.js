import {selectPost} from '../../actions/productAction';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import React, { Component, useState } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

class TotalPriceCal extends Component{

    //get Total price to card component

getTotal(){
    return this.props.allPost.map((post)=>{
        return(<div>
            
            <p key={post.id}>{post.price}</p>
            </div>
        );
    })
}

// Show total in Card componrnt in the card
render(){
    if(!this.props.allPost){
        return(<CircularProgress />);
    }
    let total = 0;
    return(
        <ul>
            {total} = {total}+{this.getTotal()}
            
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

export default connect(mapStateProps,matchDispatchToProps) (TotalPriceCal);