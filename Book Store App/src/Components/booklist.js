import React, { Component } from 'react'
import { Card, CardContent, CardActions, TextField, Paper, Grid, Table, TableBody, TableCell, TableContainer, 
    TableHead, TableRow, ButtonGroup, Button, Link, InputBase, IconButton, Divider, Avatar, Snackbar } from '@material-ui/core';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faTrash, faList, faEdit, faCaretSquareDown, faCaretSquareUp, faFastBackward, faStepBackward, faFastForward, faStepForward} from '@fortawesome/free-solid-svg-icons';
import SearchIcon from '@material-ui/icons/Search';
import ClearIcon from '@material-ui/icons/Clear';
import MenuIcon from '@material-ui/icons/Menu';
import axios from 'axios'
import MuiAlert from "@material-ui/lab/Alert";
import BookService from '../Services/book.service';


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
  
export class BookList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            books: [],
            search: '',
            currentPage: 1,
            booksPerPage: 5,
            sortToggle: true
        }
    }
    
    componentDidMount() {
        this.findAllBooks(this.state.currentPage)
    }

    handleClose = (event, reason) => {
        if (reason === "clickaway") {
          return;
        }
        this.setState({snackbaropen:false})
    };

    findAllBooks = (currentPage) => {
        currentPage-= 1
        let sortDir = this.state.sortToggle ? "asc" : "desc"

        BookService.getSearchBook(currentPage,this.state.booksPerPage,'price', sortDir, ' ')
            .then(response => response.data)
            .then((data) => {
                console.log(data)
                this.setState({
                    books: data.data,
                    totalPages: data.totalPages,
                    totalElements: data.totalElements,
                    currentPage: data.number + 1
                })
                console.log(this.state.books)
                console.log(data.number + 1)
                console.log(this.state.totalPages)
                console.log(this.state.totalElements)
            })
    }

    sortData = () => {
        this.setState((state) => ({
            sortToggle: !state.sortToggle
        }))
        this.findAllBooks(this.state.currentPage)
    }

    deleteBook = (bookId) => {
        BookService.deleteBook(bookId)
        .then(response => {
            if(response.data != null) {
                this.setState({snackbaropen:true, message:'Book deleted successfully', color:'error'})
                window.location.reload()
                this.setState({
                    books: this.state.books.filter(book => book.id !== bookId)
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
            this.findAllBooks(targetPage)
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
        BookService.getSearchBook(currentPage,this.state.booksPerPage,'id',this.state.search)
            .then(response => response.data)
            .then((data) => {
                this.setState({
                    books: data.data,
                    totalPages: data.totalPages,
                    totalElements: data.totalElements,
                    currentPage: data.number + 1
                });
            });
    }

    firstPage = () => {
        let firstPage = 1;
        if(this.state.currentPage > firstPage) {
            if(this.state.search) {
                this.searchData(firstPage);
            } else {
                this.findAllBooks(firstPage);
            }
        }
    };

    prevPage = () => {
        let prevPage = 1;
        if(this.state.currentPage > prevPage) {
            if(this.state.search) {
                this.searchData(this.state.currentPage - prevPage);
            } else {
                this.findAllBooks(this.state.currentPage - prevPage);
            }
        }
    };

    lastPage = () => {
        let condition = Math.ceil(this.state.totalElements / this.state.booksPerPage);
        if(this.state.currentPage < condition) {
            if(this.state.search) {
                this.searchData(condition);
            } else {
                this.findAllBooks(condition);
            }
        }
    };

    nextPage = () => {
        if(this.state.currentPage < Math.ceil(this.state.totalElements / this.state.booksPerPage)) {
            if(this.state.search) {
                this.searchData(this.state.currentPage + 1);
            } else {
                this.findAllBooks(this.state.currentPage + 1);
            }
        }
    };

    cancelSearch = () => {
        this.setState({"search" : ''});
        this.findAllBooks(this.state.currentPage);
    };

    render() {
        const {books, currentPage, totalPages, search} = this.state;

        return (
            <div>
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
                                                                <FontAwesomeIcon icon={faList}/> Book List
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
                                        <form noValidate autoComplete="off" id="bookFormId">
                                            <CardContent>
                                                <Grid container>
                                                    <Grid container item xs={12}>
                                                    <Grid item xs={12}>
                                                        <Paper style={{textAlign: 'left'}} elevation={3}>
                                                            <TableContainer component={Paper}>
                                                            <Table aria-label="simple table">
                                                                <TableHead>
                                                                    <TableRow>
                                                                        <TableCell component="th" align="center">Title</TableCell>
                                                                        <TableCell component="th" align="center">Author</TableCell>
                                                                        <TableCell component="th" align="center">ISBN Number</TableCell>
                                                                        <TableCell component="th" align="center" onClick={this.sortData}>Price <FontAwesomeIcon icon={this.state.sortToggle ? faCaretSquareDown : faCaretSquareUp}/></TableCell>
                                                                        <TableCell component="th" align="center">Language</TableCell>
                                                                        <TableCell component="th" align="center">Genre</TableCell>
                                                                        <TableCell component="th" align="center">Actions</TableCell>
                                                                    </TableRow>
                                                                </TableHead>
                                                                <TableBody> 
                                                                    { books.length === 0 ?
                                                                    <TableRow>
                                                                        <TableCell colSpan="7" align="center">No Books Available.</TableCell>
                                                                    </TableRow> :
                                                                    books.map((book) => (
                                                                    <TableRow key={book.id}>
                                                                        <TableCell>
                                                                            <Avatar src={book.image}/>{book.title}
                                                                        </TableCell>
                                                                        {console.log(books)}
                                                                        <TableCell align="center">{book.author}</TableCell>
                                                                        <TableCell align="center">{book.isbnNumber}</TableCell>
                                                                        <TableCell align="center">{book.price}</TableCell>
                                                                        <TableCell align="center">{book.language}</TableCell>
                                                                        <TableCell align="center">{book.genre}</TableCell>
                                                                        <TableCell align="center">
                                                                            <ButtonGroup variant="text">
                                                                                <Link href={"addBook/"+book.id} underline="none">
                                                                                    <FontAwesomeIcon icon={faEdit} />
                                                                                </Link>
                                                                                <Button border='0' onClick={() => this.deleteBook(book.id)}>
                                                                                    <FontAwesomeIcon icon={faTrash} />
                                                                                </Button>
                                                                            </ButtonGroup>
                                                                        </TableCell>
                                                                    </TableRow>
                                                                    ))}
                                                                </TableBody>
                                                            </Table>
                                                        </TableContainer>
                                                        </Paper>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </CardContent>
                                            {
                                            books.length > 0 ?
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
            </div>
        )
    }
}

export default BookList