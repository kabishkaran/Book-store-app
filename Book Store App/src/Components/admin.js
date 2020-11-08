import React, { Component } from "react";
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import PeopleIcon from '@material-ui/icons/People';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import AuthServices from '../Services/auth.service';


const style={
  root: {
      backgroundColor:'#3e2723',
      marginTop: 20,
      align:'center',
      color:'white'
      
    },
    root1: {
      backgroundColor:'#5d4037',
      marginTop: 20,
      color:"white",
      align:'center',
      
    },
    root2: {
      backgroundColor:'black',
      marginTop: 20,
      height:495,
      
    },
  }
export default class AdminBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
}

  componentDidMount() {
    const user = AuthServices.getCurrentUser();
    if (user){
      this.setState({
        User: user.roles.includes("ROLE_USER"),
        Admin: user.roles.includes("ROLE_ADMIN")
        });
      }
      
}

  render() {
    return (
      <>
      {this.state.Admin?(
      <Grid container >
        <Grid item xs={2}/>
        <Grid item xs={8}>
          <Card style={style.root2}>
      <Grid container>
        <Grid item xs={3}/>
        <Grid item xs={6}>
          <Card style={style.root}><br/>
            <h2 align="center">Welcome to Admin Panel</h2><br/>
          </Card>
          <Grid container spacing={2}>
            <Grid item xs={6}>
            <Card style={style.root1} fullWidth>
              <div>
                <center>
                  <PeopleIcon style={{fontSize:300,color:'black'}}/>
                  </center>
                  </div>
                  <Box textAlign="left"mt={-5} m={2} >Manage Users</Box>
                  &nbsp;<Button href="/AddUser" variant='contained'>Add Users</Button>&nbsp;
                  <Button href="/userlist" variant='contained'>View Users</Button>
            </Card>
            </Grid>
            <Grid item xs={6}>
            <Card style={style.root1}>
            <div>
                <center>
                  <MenuBookIcon style={{fontSize:300,color:'black'}}/>
                  </center>
                  </div>
                  <Box textAlign="left"mt={-5} m={2} >Manage Books</Box>
                  &nbsp;<Button href="/addbook" variant='contained'>Add Book</Button>&nbsp;
                  <Button href="/booklist" variant='contained'>View Books</Button>
            </Card>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      </Card>
      </Grid>
      <Grid item xs={2}/>
      </Grid>):
      (
        <Grid container style={{marginTop:"5%"}}>
          <Grid item xs/>
          <Grid item xs={4}>
            <Card style={{textAlign:"center",backgroundColor:"#ef5350", fontSize:100}}>
              Not Allowed!
            </Card>
          </Grid>
          <Grid item xs/>
        </Grid>
      )}
      </>
    );
  }
}