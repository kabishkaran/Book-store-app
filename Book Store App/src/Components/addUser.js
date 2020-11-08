import React,{Component} from "react";
import Grid from '@material-ui/core/Grid';
import CardContent from '@material-ui/core/CardContent';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faEdit} from '@fortawesome/free-solid-svg-icons';
import CardActions from '@material-ui/core/CardActions';
import FormControl from "@material-ui/core/FormControl";
import Button from "@material-ui/core/Button";
import Box from '@material-ui/core/Box';
import SaveIcon from '@material-ui/icons/Save';
import ListAltOutlinedIcon from '@material-ui/icons/ListAltOutlined';
import RotateLeftOutlinedIcon from '@material-ui/icons/RotateLeftOutlined';
import AuthServices from '../Services/auth.service';
import MuiAlert from "@material-ui/lab/Alert";
import CancelIcon from '@material-ui/icons/Cancel';
import { Card, createMuiTheme, InputLabel, Select, Snackbar,ThemeProvider } from "@material-ui/core";
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import RestoreIcon from '@material-ui/icons/Restore';
import ListIcon from '@material-ui/icons/List';
import { blue, green } from "@material-ui/core/colors";
import AddBoxIcon from '@material-ui/icons/AddBox';



const theme = createMuiTheme({
  palette: {
    primary: green,
    secondary:{
      main:blue[900],
  }},
});

const style = {
  papersty: {
    minWidth: 275,
    backgroundColor:'#212121',
    marginTop: 20,
  },
  cardsty: {
    // minWidth: 270,
    // margin: 20
  },
  root: {
    minWidth: 270,
    backgroundColor:'black',
    marginTop: "3%",
    height:"95%",
  },
  root1:{
    marginTop:"2%",
    backgroundColor:'white',
    color: 'black',
    width:"100%",
  },

}


function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default class AddUser extends Component {
   constructor(props){
     super(props);
     this.state = this.initialState
     this.state = {
        username: '',
        email:'',
        password:'',
        message:null,
        button:false,
        snackbaropen: false,
        open: false,
        color:null,
        roles:[],
        changeRole:'',
       }
       this.addUser = this.addUser.bind(this);
       this.loadUser = this.loadUser.bind(this);
       this.updateUser = this.updateUser.bind(this);
   }

   handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    this.setState({snackbaropen:false})
  };

  initialState = {
    id:'', username:'', email:'', password:'', role:'',cinfirmPassword:''
  };

loadUser=(id)=>{
  AuthServices.fetchUserById(id)
  .then((res)=>{
      let user = res.data;
      this.setState({
        username:user.username,
        email:user.email,
        roles:user.roles,
        id:user.id,
        password:user.password
      })
      if(this.state.roles[0].name=='ROLE_USER'){
        this.setState({userRole:'user'})
      }else{
        this.setState({userRole:'admin'})
      }
      console.log(this.state.userRole)
  });
}

updateUser = (e) => {
  e.preventDefault();
  let user = {
    id:this.state.id,
    username:this.state.username,
    email:this.state.email,
    password:this.state.password,
    updateroles:[this.state.changeRole]};
  AuthServices.updateUser(user)
  .then(res =>{
      this.setState({message : 'User added successfully.'});
      console.log(res.data)
      this.setState({snackbaropen:true, message:'User added successfully', color:'success'})
      setTimeout(()=> this.updateUserAlert(), 3000)
  })
  this.setState(this.initialState);
  console.log(this.state.roles)
  console.log(this.state.changeRole)
}

  addUser = (e) => {
    e.preventDefault();
    console.log("addUser")
    let user = {username:this.state.username,
                email:this.state.email,
                password:this.state.password,
                roles:[this.state.changeRole]
              };
              console.log(user)
    AuthServices.addUser(user)
    .then(res =>{
      this.setState({snackbaropen:true, message:'User added successfully', color:'success'})
      setTimeout(()=> this.addUserAlert(), 3000)
    },
    (error)=>{
      this.setState({snackbaropen:true, message:'failed', color:'error'})
    });
    this.setState(this.initialState);
  }

  addUserAlert =()=>{
    return this.props.history.push('/userList');
  }
  updateUserAlert =()=>{
    return this.props.history.push('/userList');
  }

  resetUser = () => {
    this.setState(() => this.initialState)
  }

  componentDidMount(){
    console.log(this.state.roles)
    const id = this.props.match.params.id;
    if(this.props.match.params.id){
      this.loadUser(id);
  }
  const user = AuthServices.getCurrentUser();
            if (user){
                this.setState({
                    User: user.roles.includes("ROLE_USER"),
                    Admin: user.roles.includes("ROLE_ADMIN")
                    });
                }
  ValidatorForm.addValidationRule('isPassword', (value) => 
        {
            
            if ( value.length<6) {
                return false;
            }
            else if (value.length>40) {
                return false;
            }
            return true;
        });
        ValidatorForm.addValidationRule('isUsername', (value) => 
        {
            
            if ( value.length<6) {
                return false;
            }
           else if (value.length>40) {
                return false;
            }
            return true;
        });
        ValidatorForm.addValidationRule('isPasswordsame', (value) => 
        {
            
            if ( value !== this.state.password) {
                return false;
            }
            if ( value.length<6) {
              return false;
          }
           else if (value.length>20) {
                return false;
            }
            return true;
        });
  }

  changeRole = (e) =>{
    const changeRole = e.target.value;
    this.setState({changeRole})
    console.log(this.state.changeRole)
  }

  onChange = (e) =>{
  console.log(e.target.value)
  console.log(this.state.roles)
  this.setState({ [e.target.name]: e.target.value });
  }

  render(){

    return(
      <>
      {this.state.Admin?(
        <>
      <div>
      <Snackbar open={this.state.snackbaropen} autoHideDuration={1000} onClose={this.handleClose} anchorOrigin={{  vertical: 'top', horizontal: 'right'}}>
        <Alert onClose={this.handleClose} severity={this.state.color}>
          {this.state.message}
        </Alert>
      </Snackbar>
    </div>
    <Grid container>
        <Grid item xs={2}/>
        <Grid item xs={9}>
          <Card style={style.root}>
        <Grid container>
          <Grid item xs/>
          <Grid item xs={11}>
          <Card style={style.root1}>
                <CardContent>
            <ValidatorForm onSubmit={this.addUser} onReset={this.resetUser} >
            {!this.props.match.params.id?(
                      <>
                      <h6><b>
                      <AddBoxIcon />Add User Detail
                      </b></h6><br/><br/>
                      </>
                      ):(
                        <>
                        <h6><b>
                        <AddBoxIcon />Update User Detail
                        </b></h6><br/><br/>
                        </>
                      )}
            {/* <Grid container> */}
              {/* <Grid item xs={2}/> */}
              {/* <Grid item xs={8}> */}
                {/* <CardContent style={style.cardsty}> */}
                  {/* <CardActions> */}
                    {/* <CardContent> */}
                      <Grid container spacing={3}>
                      {this.props.match.params.id&&(
                        <>
                      <Grid item xs={12} sm={6}>
                        <FormControl fullWidth>
                          <TextValidator
                            label="Read Only"
                            disabled
                            name="username"
                            // required
                            label="Username"
                            value={this.state.username}
                            // onChange={this.onChange}
                            helperText="Enter username"
                            variant="outlined"
                            validators={['required', 'isUsername']}
                            errorMessages={['this field is required','The username must be 6 and 20 characters!!']}
                          />
                        </FormControl>
                      </Grid>


                      <Grid item xs={12} sm={6}>
                        <FormControl fullWidth>
                          <TextValidator
                            name="email"
                            // required
                            label="User's email"
                            value={this.state.email}
                            onChange={this.onChange}
                            helperText="Enter User's email"
                            variant="outlined"
                            validators={['required','isEmail']}
                            errorMessages={['this field is required', 'invalid email address!']}
                          />
                        </FormControl>
                      </Grid>
                      </>)}
                      {!this.props.match.params.id&&(
                        <>
                        <Grid item xs={12} sm={6}>
                        <FormControl fullWidth>
                          <TextValidator
                            name="username"
                            // required
                            label="Username"
                            value={this.state.username}
                            onChange={this.onChange}
                            helperText="Enter username"
                            variant="outlined"
                            validators={['required', 'isUsername']}
                            errorMessages={['this field is required','The username must be 6 and 20 characters!!']}
                          />
                        </FormControl>
                      </Grid>


                      <Grid item xs={12} sm={6}>
                        <FormControl fullWidth>
                          <TextValidator
                            name="email"
                            // required
                            label="User's email"
                            value={this.state.email}
                            onChange={this.onChange}
                            helperText="Enter User's email"
                            variant="outlined"
                            validators={['required','isEmail']}
                            errorMessages={['this field is required', 'invalid email address!']}
                          />
                        </FormControl>
                      </Grid>

                      <Grid item xs={12} sm={6}>
                        <FormControl fullWidth>
                          <TextValidator
                            name="password"
                            type="password"
                            label="User's password"
                            value={this.state.password}
                            onChange={this.onChange}
                            helperText="Enter User's password"
                            variant="outlined"
                            validators={['required','isPassword']}
                            errorMessages={['this field is required', 'Invalid password!']}
                          />
                        </FormControl>
                      </Grid>

                      <Grid item xs={12} sm={6}>
                        <FormControl fullWidth>
                          <TextValidator
                            name="cinfirmPassword"
                            type="password"
                            label="Confirm password"
                            value={this.state.cinfirmPassword}
                            onChange={this.onChange}
                            helperText="Enter User's password"
                            variant="outlined"
                            validators={['required','isPasswordsame']}
                            errorMessages={['this field is required', 'Please confirm the password']}
                          />
                        </FormControl>
                      </Grid>
                      </>
                      )}
                        
                      <Grid item xs={12} sm={6}>
                      <FormControl variant="outlined" >
                            <InputLabel htmlFor="outlined-category-native-simple">Role</InputLabel>
                              <Select
                                native
                                name="roles"
                                onClick={this.changeRole}
                                label="Role"
                                >
                                <option value={'user'}>ROLE_USER</option>
                                <option value={'admin'}>ROLE_ADMIN</option>
                              </Select>
                            </FormControl>
                            </Grid>

                      </Grid>
                    {/* </CardContent> */}
                  {/* </CardActions> */}
                  <CardActions>
                    {!this.props.match.params.id?(
                      <>
                      <div style={{marginLeft: 'auto'}}>
                        <Box>
                        <ThemeProvider theme={theme}>
                            <Button startIcon={<SaveIcon />} variant="contained" color="primary" type="submit" >
                              SAVE
                            </Button>&nbsp;
                            <Button type="reset" style={{color:"black"}}  startIcon={<RestoreIcon />} variant="contained" color="secondary" >
                              RESET
                            </Button>&nbsp;
                            <Button style={{color:"black"}} href="/userList" startIcon={<ListIcon />} variant="contained" color="secondary" >
                              USER LIST
                            </Button>
                          </ThemeProvider>
                          </Box>
                        </div>
                      </>
                    ):(
                      <>
                      <div style={{marginLeft: 'auto'}}>
                        <Box >
                          <ThemeProvider theme={theme}>
                            <Button onClick={this.updateUser} startIcon={<SaveIcon />} variant="contained" color="primary" type="save" >
                              UPDATE
                            </Button>&nbsp;
                            <Button type="reset" style={{color:"black"}}  startIcon={<RestoreIcon />} variant="contained" color="secondary" >
                              RESET
                            </Button>&nbsp;
                            <Button style={{color:"black"}} href="/userList" startIcon={<ListIcon />} variant="contained" color="secondary" >
                              USER LIST
                            </Button>
                          </ThemeProvider>
                        </Box>
                      </div>
                    </>
                    )}
                    </CardActions>
                {/* </CardContent> */}
              {/* </Grid> */}
              {/* <Grid item xs={2}/> */}
            {/* </Grid> */}
            </ValidatorForm>
            </CardContent>
            </Card>
          </Grid>
          <Grid item xs/>
        </Grid>
        </Card>
            </Grid>
            <Grid item xs={1}/>
            </Grid>
            </>):(
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
    )
  }
}