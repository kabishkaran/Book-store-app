import React, { Component } from 'react'
import { Card, CardContent, CardActions, TextField, Paper, Grid, Table, TableBody, TableCell, TableContainer,
    TableHead, TableRow, ButtonGroup, Button, InputBase, IconButton, Divider, Link, Snackbar } from '@material-ui/core';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faTrash, faUsers, faEdit, faFastBackward, faStepBackward, faFastForward, faStepForward} from '@fortawesome/free-solid-svg-icons';
import SearchIcon from '@material-ui/icons/Search';
import ClearIcon from '@material-ui/icons/Clear';
import MenuIcon from '@material-ui/icons/Menu';
import axios from 'axios'
import MuiAlert from "@material-ui/lab/Alert";
import AuthServices from '../Services/auth.service';



const paper = {
    padding: '2px 4px',
    display: 'flex',
    width: 400,
    marginLeft: 'auto'
}
const style = {
    root: {
      backgroundColor:'#313231',
      marginTop: 20,
      color: '#e0f7fa'
    },
    title: {
      fontSize: 24,
      textAlign:'center'
    },
}
function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

class UserList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            users: [],
            search: '',
            currentPage: 1,
            usersPerPage: 5
        }
    }

    handleClose = (event, reason) => {
        if (reason === "clickaway") {
          return;
        }
        this.setState({snackbaropen:false})
    };

    componentDidMount() {
        this.findAllUsers(this.state.currentPage)
        const user = AuthServices.getCurrentUser();
            if (user){
                this.setState({
                    User: user.roles.includes("ROLE_USER"),
                    Admin: user.roles.includes("ROLE_ADMIN")
                    });
                }
    }

    findAllUsers = (currentPage) => {
        currentPage-= 1

        AuthServices.getAllUserInPage(currentPage,this.state.usersPerPage,'id')
            .then(response => response.data)
            .then((data) => {
                console.log(data.data)
                this.setState({
                    users: data.data,
                    totalPages: data.totalPages,
                    totalElements: data.totalElements,
                    currentPage: data.number + 1
                })
                console.log(this.state.users)
                console.log(this.state.currentPage)
                console.log(this.state.totalPages)
                console.log(this.state.totalElements)
            })
    }

    deleteUser = (userId) => {
        AuthServices.deleteUser(userId)
        .then(response => {
            if(response.data != null) {
                this.setState({snackbaropen:true, message:'User deleted successfully', color:'error'})
                window.location.reload()
                this.setState({
                    users: this.state.users.filter(user => user.id !== userId)
                });
            } else {
                this.setState({"show":false});
            }
        });
    }
    
    changePage = event => {
        let targetPage = parseInt(event.target.value)
        if (this.state.search) {
            this.searchData(targetPage)
        } else {
            this.findAllUsers(targetPage)
        }
        this.setState({
            [event.target.name]: targetPage
        })
    }

    searchChange = event => {
        this.setState({
            [event.target.name] : event.target.value
        });
    }

    searchData = (currentPage) => {
        currentPage -= 1;
        console.log(currentPage)
        AuthServices.getSearchUser(currentPage,this.state.usersPerPage,'id',this.state.search)
            .then(response => response.data)
            .then((data) => {
                this.setState({
                    users: data.data,
                    totalPages: data.totalPages,
                    totalElements: data.totalElements,
                    currentPage: data.number + 1
                });
                console.log(this.state.totalElements)
                console.log(currentPage)
            });
    }

    firstPage = () => {
        let firstPage = 1;
        if(this.state.currentPage > firstPage) {
            if(this.state.search) {
                this.searchData(firstPage);
            } else {
                this.findAllUsers(firstPage);
            }
        }
    };

    prevPage = () => {
        let prevPage = 1;
        if(this.state.currentPage > prevPage) {
            if(this.state.search) {
                this.searchData(this.state.currentPage - prevPage);
            } else {
                this.findAllUsers(this.state.currentPage - prevPage);
            }
        }
    };

    lastPage = () => {
        let condition = Math.ceil(this.state.totalElements / this.state.usersPerPage);
        if(this.state.currentPage < condition) {
            if(this.state.search) {
                this.searchData(condition);
            } else {
                this.findAllUsers(condition);
            }
        }
    };

    nextPage = () => {
        if(this.state.currentPage < Math.ceil(this.state.totalElements / this.state.usersPerPage)) {
            if(this.state.search) {
                this.searchData(this.state.currentPage + 1);
            } else {
                this.findAllUsers(this.state.currentPage + 1);
            }
        }
    };

    cancelSearch = () => {
        this.setState({"search" : ''});
        this.findAllUsers(this.state.currentPage);
    };

    render() {
        const {users, currentPage, totalPages, search} = this.state;

        return (
            <div>
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
                    <Grid item xs={8}>
                        <Paper elevation={3}>
                            <Card style={style.root} variant="outlined">
                                <CardContent>
                <Card>
                    <CardContent>
                        <Grid container>
                            <Grid container item xs={12}>
                                <Grid item xs={6}>
                                    <Paper style={{align: 'left', textAlign:'left'}} elevation={0}>
                                        <CardContent>
                                            <FontAwesomeIcon icon={faUsers} /> User List
                                        </CardContent>
                                    </Paper>
                                </Grid>
                                <Grid item xs={6}>
                                    <Paper component="form" style={paper}>
                                        <IconButton  style={{padding: 10}} aria-label="menu">
                                            <MenuIcon />
                                        </IconButton>
                                        <InputBase name="search" value={search || ''} onChange={this.searchChange}
                                            style={{flex: 1, border: 10}} placeholder="Search text..."
                                            inputProps={{ 'aria-label': 'search text' }}/>
                                        <IconButton onClick={() => this.searchData(this.state.currentPage)} type="button" aria-label="search" style={{padding: 10}}>
                                            <SearchIcon />
                                        </IconButton>
                                        <Divider orientation="vertical" style={{height: 28,margin: 4}}/>
                                        <IconButton onClick={this.cancelSearch} type="button" aria-label="clear">
                                            <ClearIcon/>
                                        </IconButton>
                                    </Paper>
                                </Grid>
                            </Grid>
                        </Grid>
                    </CardContent>
                    <form noValidate autoComplete="off" id="userFormId">
                        <CardContent>
                            <Grid container>
                                <Grid container item xs={12}>
                                    <Grid item xs={12}>
                                        <Paper style={{textAlign: 'left'}} elevation={3}>
                                        <TableContainer component={Paper}>
                                            <Table aria-label="simple table">
                                                <TableHead>
                                                    <TableRow>
                                                        <TableCell component="th" align="center">Id</TableCell>
                                                        <TableCell component="th" align="center">Username</TableCell>
                                                        <TableCell component="th" align="center">Email</TableCell>
                                                        <TableCell component="th" align="center">Roles</TableCell>
                                                        <TableCell component="th" align="center">Actions</TableCell>
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    {
                                                        users.length < 0 ?
                                                        <TableRow>
                                                            <TableCell colSpan="7" align="center">No Users Available.</TableCell>
                                                        </TableRow> :
                                                        
                                                        users.map((user) => (
                                                            <TableRow key={user.id}>
                                                                <TableCell align="center">{user.id}</TableCell>
                                                                <TableCell align="center">{user.username}</TableCell>
                                                                <TableCell align="center">{user.email}</TableCell>
                                                                <TableCell align="center">{ (user.roles && user.roles.length > 0) ? user.roles[0].name : <span>None</span>}</TableCell>
                                                                <TableCell align="center">
                                                                    <ButtonGroup variant="text">
                                                                        <Link href={"addUser/"+user.id} underline="none">
                                                                            <FontAwesomeIcon icon={faEdit} />
                                                                        </Link>
                                                                        <Button border='0' onClick={() => this.deleteUser(user.id)}>
                                                                            <FontAwesomeIcon icon={faTrash} />
                                                                        </Button>
                                                                    </ButtonGroup>
                                                                </TableCell>
                                                            </TableRow>
                                                        ))
                                                        }
                                                </TableBody>
                                            </Table>
                                        </TableContainer>
                                        </Paper>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </CardContent>
                        {
                        users.length > 0 ?
                        <CardActions>
                            <div style={{"float":"left"}}>
                                Showing Page {currentPage} of {totalPages}
                            </div>
                            <div style={{marginLeft: 'auto'}} >
                            <Paper elevation={0}>
                                <ButtonGroup>
                                    <Button type="button" onClick={this.firstPage} variant="contained" style={{backgroundColor: '#1565c0'}} startIcon={<FontAwesomeIcon icon={faFastBackward} />} disabled={currentPage === 1 ? true : false}>
                                        First
                                    </Button>
                                    <Button type="button" onClick={this.prevPage} variant="contained" style={{backgroundColor: '#1565c0'}} startIcon={<FontAwesomeIcon icon={faStepBackward}/>} disabled={currentPage === 1 ? true : false}>
                                        Prev
                                    </Button>
                                </ButtonGroup>
                                <TextField name="currentPage" onChange={this.changePage} value={currentPage || ''} variant="outlined" size='small' style={{backgroundColor:'#eeeeee', width: 50}}/>
                                <ButtonGroup>
                                    <Button type="button" onClick={this.nextPage} variant="contained" style={{backgroundColor: '#1565c0'}} startIcon={<FontAwesomeIcon icon={faStepForward}/>} disabled={currentPage === totalPages ? true : false}>
                                        Next
                                    </Button>
                                    <Button type="button" onClick={this.lastPage} variant="contained" style={{backgroundColor: '#1565c0'}} startIcon={<FontAwesomeIcon icon={faFastForward}/>} disabled={currentPage === totalPages ? true : false}>
                                        Last
                                    </Button>
                                </ButtonGroup>
                                </Paper>
                            </div>
                        </CardActions> : null
                        }
                    </form>
                </Card>
                </CardContent>
                            </Card>
                        </Paper>
                    </Grid>
                    <Grid item xs={2}/>
                </Grid>
                </>):
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
            </div>
        )
    }
}

export default UserList
