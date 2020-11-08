import React,{Component} from 'react';
import { Route,Switch, BrowserRouter as Router } from 'react-router-dom'
import Home from './Components/Home';
import Signup from './Components/signup';
import login from './Components/login';
import 'bootstrap/dist/css/bootstrap.min.css';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Footer from './Components/Footer';
import Profile from './Components/profile';
import { AccountCircle } from "@material-ui/icons";
import AddBook from './Components/addbook';
import AdminBoard from './Components/admin';
import AddUser from './Components/addUser';
import userList from './Components/userList';
import ImportContactsIcon from '@material-ui/icons/ImportContacts';
import BookList from './Components/booklist';
import AuthService from './Services/auth.service';
const style={
   paper:{
      flexGrow:4,
      backgroundColor:'black',
      color:'white'
   },
   menuButton:{
      spacing:2,
   }, 
   title: {
      flexGrow: 1,
    },
   link:{
      underline:'none'
   },
   appBar:{
      backgroundColor:'black'
   }
}


class App extends Component{
   constructor(props) {
      super(props);
      this.logOut = this.logOut.bind(this);

      this.state = {
        showAdminBoard: false,
        currentUser: undefined,
        value:0
      };
    }
    componentDidMount() {
      const user = AuthService.getCurrentUser();

      if (user){
        this.setState({
          currentUser: AuthService.getCurrentUser(),
          showAdminBoard: user.roles.includes("ROLE_ADMIN")
        });
      }
    }
  
    logOut () {
     AuthService.logout ();
    }
  render(){
   const { currentUser, showAdminBoard } = this.state;
    return(
      <Router>
      <div>
        <AppBar position="static" style={style.appBar}>
          <Toolbar>
          <h3><ImportContactsIcon style={{fontSize:30,color:'brown'}}/> Books Shop</h3>
            <Paper style={style.paper} elevation={0}>
              <Button href="/" color='inherit'>
                <strong>HOME</strong>
              </Button>
              {showAdminBoard ? (
                <Button href="/admin" color='inherit'>
                  <strong>ADMIN BOARD</strong>
                </Button>
              ):
              (currentUser&&
                <>
                <Button href="/addbook" color='inherit'>
                  <strong>ADD BOOK</strong>
                </Button>
              
                <Button href="/booklist" color='inherit'>
                  <strong>BOOK LIST</strong>
                </Button></>)}
              
              
              
            </Paper>
            
            {currentUser ? (
              <Paper style={{'backgroundColor': 'black', 'color': 'white'}} elevation={0}>
                <Button href="/profile" color='inherit'>
                  <AccountCircle style={{ fontSize: 40 }}/>
                  <strong>{currentUser.username}</strong>
                </Button>
                <Button href="/login" color='inherit' onClick={this.logOut}>
                  <strong>LogOut</strong>
                </Button>
              </Paper>
            ) : (
              <Paper style={{'backgroundColor': 'black', 'color': 'white'}} elevation={0}>
                <Button href="/login" color='inherit'>
                  <strong>Login</strong>
                </Button>
                <Button href="/signup" color='inherit'>
                  <strong>Sign Up</strong>
                </Button>
              </Paper>
            )}
          </Toolbar>
        </AppBar>

        <div>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/login" component={login} />
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/profile" component={Profile} />
            <Route exact path="/addbook" component={AddBook} />
            <Route exact path="/addbook/:id" component={AddBook} />
            <Route path="/booklist" component={BookList} />
            <Route path="/admin" component={AdminBoard} />
            <Route exact path="/addUser" component={AddUser} />
            <Route exact path="/addUser/:id" component={AddUser} />
            <Route path="/userList" component={userList}/>
            
          </Switch>
        </div>
        <Footer/>
      </div>
    </Router>
  );
}
}
export default App;
