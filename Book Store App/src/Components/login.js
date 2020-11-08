import React, { Component } from 'react'

import { Card, CardContent, Typography, Grid, FormControl, TextField } from '@material-ui/core';
import { Face } from '@material-ui/icons';
import Button from '@material-ui/core/Button';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import AuthService from '../Services/auth.service';

const style = {
  root: {
    minWidth: 275,
    backgroundColor:'black',
    marginTop: 45,
    height:400,
  },
  root1:{
    marginTop:20,
    backgroundColor:'white',
    color: 'blue',
  }
}

 class login extends Component {
  state = {
    email: '',
}

handleChange = (event) => {
    const email = event.target.value;
    this.setState({ email });
}

handleSubmit = () => {
    // your submit logic
}
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
      loading: false,
      message: ""
    };
  }

  onChangeUsername = (e) => {
    this.setState({
      username: e.target.value
    });
  }

  onChangePassword = (e) => {
    this.setState({
      password: e.target.value
    });
  }

  handleLogin = (e) => {
    e.preventDefault();

   this.setState({
     message:"",
     loading: true
   });


   AuthService.login(this.state.username, this.state.password)
   .then(() => {
     this.props.history.push("/profile");
     window.location.reload();
   },
   error =>{
     const reMessage = 
     (error.response &&
      error.response.data&&
      error.response.data.message)||
      error.message ||
      error.toString();


      this.setState({
        loading: false,
        message: "user not found"
      });
   }
   );


  }

  render() {
    return (
      <>
      <Grid container>
        <Grid item xs={3}/>
        <Grid item xs={6}>
          <Card style={style.root}>
          <Grid container>
        <Grid item xs={3}/>
        <Grid item xs={6}>
        <Card style={style.root1}>
              <CardContent>
                <ValidatorForm
                ref="form"
                onError={errors => console.log(errors)}
                 onSubmit={this.handleLogin}  >
                  <Grid container spacing={1}>
                      <Grid item xs={12}>
                      <h2><strong>Login at Books<br/> Shop</strong></h2><br></br>
                        <FormControl fullWidth>
                          <TextValidator 
                          validators={['required']}
                          errorMessages={['This field is required!',]}
                          variant="outlined" helperText="please enter username" label="user name" type="text" name="username" value={this.state.username}
                            onChange={this.onChangeUsername} InputLabelProps={{
                              shrink: true,
                            }}/>
                        </FormControl>
                      </Grid>
                      <Grid item xs={12}>
                        <FormControl fullWidth>
                          <TextValidator
                          validators={['required']}
                          errorMessages={['This field is required!']}
                          variant="outlined" helperText="please enter password" label="password" type="password" name="password" value={this.state.password}
                            onChange={this.onChangePassword} InputLabelProps={{
                              shrink: true,
                            }}/>
                        </FormControl>
                      </Grid>
                      <Grid item xs={12}>
                        <FormControl>
                        <Button type="submit" fullWidth variant="contained" color="primary">
                            Login
                        </Button>
                        </FormControl>
                      </Grid>
                  </Grid>
                  {this.state.message && (
                    <div>
                      <Typography color='error' variant="overline" display="block" gutterBottom>
                          <strong>{this.state.message}</strong>
                      </Typography>
                    </div>
                  )}
                </ValidatorForm>
              </CardContent>
              </Card>
              </Grid>
              <Grid item xs={3}/>
              </Grid>
        </Card>
        </Grid>
        <Grid item xs={3}/>
      </Grid>
    </>);
  }
}
export default login