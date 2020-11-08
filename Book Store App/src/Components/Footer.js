import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';

const useStyles=makeStyles({
    appBar:{
        top:'auto',
        bottom:'0',
        backgroundColor:'black',
        color:'white',
    },
});

function Footer(){
    const classes=useStyles();
    let fullYear=new Date().getFullYear();

    return(
        <AppBar position='fixed' className={classes.appBar}>
            <Typography variant="overline" align="center">
                {fullYear}-{fullYear+1},ALL RIGHTS RESERVED BY KABISH
            </Typography>
        </AppBar>
    )
}
export default Footer