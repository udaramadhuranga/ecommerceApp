import { Card, CardContent, makeStyles, Typography, IconButton } from '@material-ui/core';
import React from 'react';
import DeleteIcon from '@material-ui/icons/Delete';

//Delete icon in the CartCard component
function DeleteIcon(){
    return(
        <IconButton className={classes.deleteButton}>
            <DeleteIcon />
        </IconButton>
    )
}

export default DeleteIcon;