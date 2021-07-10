import React, { Component } from 'react';
import {fetchPost} from  '../../actions/productAction';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import axios from "axios";

class CartComponent extends Component{

    componentDidMount() {

        //get and store access token
        const access_token = localStorage.getItem('token')
       console.log(access_token)
        let config = {      
            headers: {
              'Authorization': 'Bearer ' + access_token
            }
        }
        
        
        axios.get( 
            'http://localhost:8090/user/post',
            config)
          .then( ( response ) => {
            if(response.data.message){
                alert(response.data.message)  
            }else{
                this.set(response.data.user._id)
            }   
    
          })
          .catch()
       
       
    }

    set(id) {
        this.props.fetchPost(id);
    }


    // <button onClick={()=>this.props.fetchPost()}> Click Me </button>

    render(){
        return(
        <div>
           
        </div>
        )
    };
}

function matchDispatchToProps(dispatch){
    return bindActionCreators({fetchPost: fetchPost}, dispatch);
}

export default connect(null, matchDispatchToProps) (CartComponent);