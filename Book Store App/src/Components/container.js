import React,{Component} from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import { createMuiTheme } from '@material-ui/core/styles';

const style={
    root:{
        marginTop:10,
        height:200,
        color:'white',
        backgroundColor:'#212121',
    },
    root1:{
        marginTop:30,
        height:260,
        color:'white',
        backgroundColor:'#000000',
        flexGrow: 20,
    },
    align:{
        textAlign:"center m={1}"
    }
}

function Container(props){
    return(
    <>
                <Grid container>
                <Grid item xs/>
                <Grid item xs={10}>
                <Card variant="outlined" style={style.root1}>
                    <CardContent>
                    <Typography variant="outline" display="block" style={style.root} gutterBottom>
                        <Box textAlign="left" m={2}><h1>{props.content}</h1></Box>
                        <Box textAlign="left" m={2}>{props.content1}</Box>
                       <Box textAlign="left" p={3}>{props.content2}</Box>
                    </Typography>
                    </CardContent>
                </Card>
                </Grid>
                <Grid item xs/>
                </Grid >
    </>
    )}
export default Container
