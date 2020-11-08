import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import AuthService from '../Services/auth.service';
import { Typography } from '@material-ui/core';

const style={
    root: {
        minWidth: 275,
        backgroundColor:'black',
        marginTop: 45,
        height:460,
      },
      root1:{
        marginTop:20,
        backgroundColor:'white',
        color: 'blue',
      },
      box:{
          color:'green',
          backgroundColor:'black',
          textAlign:'center',
      },
      bCard:{
          backgroundColor:"black",
          marginTop: 30,
          minWidth: 275,
          height:"auto"
      },
      sCard:{
        backgroundColor:'black',
        marginTop:20,
      },
      sCard1:{
        color:'blue',
        backgroundColor:'white',
      }
    
}

class Signup extends Component {
    state = {
        email: '',
        username:'',
        password:'',
    }
    
    handleChange = (event) => {
        const email = event.target.value;
        this.setState({ email });
    }
    handleChangeUn = (event) => {
        const username = event.target.value;
        this.setState({ username });
    }
    handleChangePa = (event) => {
        const password = event.target.value;
        this.setState({ password });
    }
    
    handleSubmit = () => {
    }
    componentDidMount() {
        ValidatorForm.addValidationRule('isPassword', (value) => 
        {
            
            if ( value.length<6) {
                return false;
            }
            if (value.length>40) {
                return false;
            }
            return true;
        });
        ValidatorForm.addValidationRule('isUsername', (value) => 
        {
            
            if ( value.length<6) {
                return false;
            }
            if (value.length>40) {
                return false;
            }
            return true;
        });
    }
    handleSignup=(e)=>{
        e.preventDefault();

        this.setState({
          message:"",
          successful:false
        });
    
        // if (this.state.username && this.state.email && this.state.password) {
        //     console.log(this.state.username + " " + this.state.password + " " + this.state.email)
        //     this.setState({
        //       successful: true,
        //       message: "USER REGISTERED SUCCESSFULLY!"
        //     })
        //   }}
        AuthService.register(
          this.state.username,
          this.state.email,
          this.state.password
        ).then(
          Response=>{
            this.setState({
              message:Response.data.message,
              successful:true
            });
          },
          error =>{
            const resMessage = (
              error.response && 
              error.response.data &&
              error.response.data.message)||
              error.message||
              error.toString();

              this.setState({
                successful: false,
                message: resMessage
              });
            
          }
        );

      }


render(){
    const { email,username,password } = this.state;
    return(
        <>
        <Grid container>
        <Grid item xs={3}/>
        <Grid item xs={6}>
          <Box display={this.state.successful ? 'block' : 'none'}>
        <Card style={style.sCard} >
          <CardContent>
          <Grid container>
        <Grid item xs={3}/>
        <Grid item xs={6}>
          <Card style={style.sCard1}>
              <CardContent>
        <div><strong>USER REGISTERED SUCCESSFULLY</strong></div>
        </CardContent>
        </Card>
        <Grid item xs={3}/>
        </Grid>
        </Grid>
        </CardContent>
        </Card>
        </Box>
        </Grid>
        <Grid item xs={3}>
          </Grid>
          </Grid>
        {!this.state.successful && (
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
                 onSubmit={this.handleSignup}  >
                            {!this.state.successful && (
                                <Grid container spacing={1}>
                                    <Grid item xs={12}>
                                    <h2>Registerr Account at Books<br/> Shop</h2>
                                        <FormControl fullWidth>
                                        <TextValidator
                                             variant="outlined"
                                             label="username"
                                             onChange={this.handleChangeUn}
                                            name="username"
                                             value={username}
                                             validators={['required','isUsername']}
                                             errorMessages={['This field is required!!', 'The username must be 6 and 40 characters!!']}
                                             helperText="Please enter username"
                                             InputLabelProps={{
                                                shrink: true,
                                              }}
                                        />
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <FormControl fullWidth>
                                        <TextValidator
                                             variant="outlined"
                                             label="Email"
                                             onChange={this.handleChange}
                                            name="email"
                                             value={email}
                                             validators={['required', 'isEmail']}
                                             errorMessages={['This field is required!!', 'This is not a valid email!!']}
                                             helperText="Please enter email"
                                             InputLabelProps={{
                                                shrink: true,
                                              }}
                                        />
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <FormControl fullWidth>
                                        <TextValidator
                                            type="password"
                                             variant="outlined"
                                             label="password"
                                             onChange={this.handleChangePa}
                                             name="password"
                                             value={password}
                                             validators={['required', 'isPassword']}
                                             errorMessages={['This field is required!!', 'The password must be 6 and 40 characters!!']}
                                             helperText="Please enter password"
                                             InputLabelProps={{
                                                shrink: true,
                                              }}
                                        />
                                        </FormControl>
                                    </Grid>
                        <Grid item xs={12}>
                        <FormControl>
                        <Button type="submit" fullWidth variant="contained" color="primary">
                            Sign In
                        </Button>
                        </FormControl>
                      </Grid>
                      </Grid>
                      
                  )}
                  {
                    this.state.message && (
                    <div>
                      <Typography color={this.state.successful ? 'primary' : 'error'} variant="overline" display="block" gutterBottom>
                          <strong>{this.state.message}</strong>
                      </Typography>
                    </div>
                  )
                  }
                </ValidatorForm>
                
              </CardContent>
              </Card>
              </Grid>
              <Grid item xs={3}/>
              </Grid>
        </Card>
        </Grid>
        <Grid item xs={3}/>
      </Grid>)}
   </>);
  }
}

export default Signup
