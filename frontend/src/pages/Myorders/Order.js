
import React, {useEffect, useState } from 'react';
import axios from "axios";
import CartCard from '../../components/Cart/Components/CartCard';
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import CardComponent from "./CardComponent";
import NavBar from "../../components/NavigationBar/NavBar";
import { useHistory } from "react-router-dom";

const paperStyle = {
    width: "30%",
    heigth: "auto",
    padding: "2.5%",
    position: "absolute",
    top: "10%",
    left: "30%"
}

function Myorders(){

    const history = useHistory() 
    if('token' in localStorage){    
    }else{
        alert("Invalid token")
        history.push('/')
    }


   const [display,setDisplay] = useState([]);


        //get and store access token to get coresponding user to get logged user id
        const access_token = localStorage.getItem('token')
       
        let config = {      
            headers: {
              'Authorization': 'Bearer ' + access_token
            }
        }
        axios.get('http://localhost:8090/user/post',config)
          .then((response ) => {
            if(response.data.message){
                alert(response.data.message)  
            }else{           

              axios.get("http://localhost:8090/order/get",{params:{id:response.data.user._id}})
                .then((res)=>{  
                    //posts get as a arry 
                    //assigning it to setDisplay state 
                    setDisplay(res.data);
                }).catch()
   
            }
        }).catch()   

    return(
        <div>
            <br/>
            <br/>
            <NavBar />
            {   //display ordes one by one
                display.map(display=>(
                    <div key={display._id} class="card" style={{borderRadius:'10px',padding:'15px',backgroundColor:"whitesmoke",display:"inline-block",marginLeft:'15px',marginTop:'10px'}}>
                       
                       <CardComponent
                                itemId = {display.itemId}
                                itemprice = {display.itemprice}
                                userID = {display.userID}
                                PaidDate = {display.PaidDate}
                                fullName = {display.fullName}                                
                                phone = {display.phone}
                                address = {display.address}
                                district = {display.district}
                                province = {display.province}
                                postal = {display.postal}     
                            />
                            
                    </div>

                ))
            }

        </div>
    )
    
}

export default Myorders