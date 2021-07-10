import React from "react";
import Paper from "@material-ui/core/Paper";


const paperStyle = {
    width: "100%",
    heigth: "auto",
    padding: "2.5%",
    marginTop: "8%"
}

function CardComponent(props) {
    return (
        <div>
            <Paper style={paperStyle} elevation={11} >
                <h6>Item ID : {props.itemId}</h6>
                <h6>Price : {props.itemprice}</h6>
                <h6>user ID : {props.userID}</h6>
                <h6>Paid date : {props.PaidDate}</h6>
                <h6>name : {props.fullName}</h6>
                <h6>phone : {props.phone}</h6>
                <h6>address : {props.address}</h6>
                <h6>District : {props.district}</h6>
                <h6>province : {props.province}</h6>
                <h6>postal : {props.postal}</h6>
            </Paper>
        </div>
    )
}

export default CardComponent;