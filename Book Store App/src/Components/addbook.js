import React, { Component } from "react";
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import { green,blue } from '@material-ui/core/colors';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import SaveIcon from '@material-ui/icons/Save';
import RestoreIcon from '@material-ui/icons/Restore';
import ListIcon from '@material-ui/icons/List';
import Box from '@material-ui/core/Box';
import AddBoxIcon from '@material-ui/icons/AddBox';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import { InputLabel, Select, Snackbar } from "@material-ui/core";
import BookService from '../Services/book.service';
import MuiAlert from "@material-ui/lab/Alert";


  const theme = createMuiTheme({
    palette: {
      primary: green,
      secondary:{
        main:blue[900],
    }},
  });
  const style = {
    root: {
      minWidth: 275,
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
    sCard:{
      backgroundColor:'black',
      marginTop:20,
    },
    sCard1:{
      color:'white',
      backgroundColor:'green',
      textAlign:'center',
      fontSize:30,
    }
  }
  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }
   class AddBook extends Component {
  constructor(props){
    super(props);
    this.state = this.initialState
    this.state={
        title:"",
        successful:false,
        author:'',
        price:'',
        image:'',
        isbnNumber:'',
        language:'',
        genre:''
    };
    this.loadBook = this.loadBook.bind(this);
}

  componentDidMount(){
    const id = this.props.match.params.id;
    console.log(this.props.match.params.id)
    if(this.props.match.params.id){
      this.loadBook(id);
  }
}

initialState = {
  id:'', title:'', author:'', price:'', image:'',isbnNumber:'',language:'',genre:''
};

resetBook = () => {
  this.setState(() => this.initialState)
}

handleClose = (event, reason) => {
  if (reason === "clickaway") {
    return;
  }

  this.setState({snackbaropen:false})
};


loadBook=(id)=>{
  BookService.getBookById(id)
  .then((res)=>{
      let book = res.data;
      this.setState({
        id:book.id,
        title:book.title,
        author:book.author,
        price:book.price,
        isbnNumber:book.isbnNumber,
        image:book.image,
        genre:book.genre,
        language:book.language

      })
  });
}

addBook = (e) =>{
  e.preventDefault();
  let book = {
    title:this.state.title,
    author:this.state.author,
    price:this.state.price,
    isbnNumber:this.state.isbnNumber,
    image:this.state.image,
    genre:this.state.genre,
    language:this.state.language
  };
  BookService.addBook(book)
  .then(res=>{
    this.setState({snackbaropen:true, message:'Book added successfully', color:'success'})
      setTimeout(()=> this.addBookAlert(), 3000)
    },
    (error)=>{
      this.setState({snackbaropen:true, message:'failed', color:'error'})
    });
    this.setState(this.initialState);
}
addBookAlert =()=>{
  return this.props.history.push('/bookList');
}

updateBook = (e) =>{
  e.preventDefault();
  let book = {
    id:this.state.id,
    title:this.state.title,
    author:this.state.author,
    price:this.state.price,
    isbnNumber:this.state.isbnNumber,
    image:this.state.image,
    genre:this.state.genre,
    language:this.state.language};
    BookService.updateBook(book)
    .then(res =>{
      this.setState({message : 'Book added successfully.'});
      console.log(res.data)
      this.setState({snackbaropen:true, message:'Book added successfully', color:'success'})
      setTimeout(()=> this.updateBookAlert(), 3000)
    })
    this.setState(this.initialState);

  }
  updateBookAlert =()=>{
    return this.props.history.push('/bookList');
  }

bookChange = event => {
  this.setState({
      [event.target.name] : event.target.value
  })
}

language = (e) =>{
  const language = e.target.value;
  this.setState({language})
  console.log(this.state.language)
}

genre = (e) =>{
  const genre = e.target.value;
  this.setState({genre})
  console.log(this.state.genre)
}
  handleSave=(e)=>{
    e.preventDefault();

    if (this.state.title) {
        this.setState({
          successful: true,
        })
      }
    }
  render() {
    return (
      <>
      <div>
      <Snackbar open={this.state.snackbaropen} autoHideDuration={1000} onClose={this.handleClose} anchorOrigin={{  vertical: 'top', horizontal: 'right'}}>
        <Alert onClose={this.handleClose} severity={this.state.color}>
          {this.state.message}
        </Alert>
      </Snackbar>
    </div>
                    <>
       <Grid container>
        <Grid item xs={2}/>
        <Grid item xs={9}>
          <Card style={style.root}>
       <Grid container>
            <Grid item xs/>
            <Grid item xs={11}>
              <Card style={style.root1}>
                <CardContent>
                  <form onSubmit={this.addBook} onReset={this.resetBook}>
                    <div>
                    <h6 ><b><AddBoxIcon />Add New Book</b></h6><br/><br/>
                  <Grid container spacing={4}>
                    <Grid item xs={6}>
                    <FormControl fullWidth>
                     <TextField type="text" onChange={this.bookChange} label="Title" value={this.state.title} helperText="Enter Book Title" required name="title" id="title" variant="outlined" />
                    </FormControl>
                      </Grid>
                      <Grid item xs={6}>
                      <FormControl fullWidth>
                     <TextField type="text" label="Auther" onChange={this.bookChange} value={this.state.author} required name="author" helperText="Enter Book Auther" id="author"variant="outlined" />
                    </FormControl>
                      </Grid>
                      </Grid>
                      </div>
                    <div>
                    <Grid container spacing={4}>
                    <Grid item xs={6}>
                      <FormControl fullWidth>
                      <TextField type="text" onChange={this.bookChange}  label="Cover Photo URL" value={this.state.image} helperText="Enter Book Cover Photo URL" required name="image" id="image" variant="outlined" />
                      </FormControl>
                    </Grid>
                    <Grid item xs={6}>
                      <FormControl fullWidth>
                      <TextField type="text" label="ISBN Number" onChange={this.bookChange} value={this.state.isbnNumber} required name="isbnNumber" helperText="Enter Book ISBN number" id="auther"variant="outlined" />
                      </FormControl>
                    </Grid>
                    </Grid>
                    </div>
                    <div>
                    <Grid container spacing={4}>
                    <Grid item xs={4}>
                      <FormControl fullWidth>
                      <TextField type="number" onChange={this.bookChange} label="Price" value={this.state.price} helperText="Enter Book Price" required name="price" id="price" variant="outlined" />
                      </FormControl>
                    </Grid>
                    <Grid item xs={4}>
                    <FormControl fullWidth variant="outlined" >
                            <InputLabel htmlFor="outlined-category-native-simple">Language</InputLabel>
                              <Select
                                native
                                name="language"
                                onClick={this.language}
                                label="Language"
                                >
                                <option value={'s'}>Select Language</option>
                                <option value={'arabic'}>Arabic</option>
                                <option value={'chinese'}>Chinese</option>
                                <option value={'english'}>English</option>
                                <option value={'tamil'}>Tamil</option>
                              </Select>
                            </FormControl>
                    </Grid>
                    <Grid item xs={4}>
                    <FormControl fullWidth variant="outlined" >
                            <InputLabel htmlFor="outlined-category-native-simple">Genre</InputLabel>
                              <Select
                                native
                                name="genre"
                                onClick={this.genre}
                                label="Genre"
                                >
                                <option value={'s'}>Select Genre</option>
                                <option value={'action'}>Action</option>
                                <option value={'horror'}>Horror</option>
                                <option value={'science'}>Science</option>
                                <option value={'technology'}>Technology</option>
                              </Select>
                            </FormControl>
                    </Grid>
                    </Grid>
                    </div>
                    {!this.props.match.params.id?(
                      <>
                      <div style={{textAlign: 'right'}}>
                        <Box>
                        <ThemeProvider theme={theme}>
                            <Button startIcon={<SaveIcon />} variant="contained" color="primary" type="submit" >
                              SAVE
                            </Button>&nbsp;
                            <Button type="reset" style={{color:"black"}}  startIcon={<RestoreIcon />} variant="contained" color="secondary" >
                              RESET
                            </Button>&nbsp;
                            <Button style={{color:"black"}} href="/bookList" startIcon={<ListIcon />} variant="contained" color="secondary" >
                              BOOK LIST
                            </Button>
                          </ThemeProvider>
                          </Box>
                        </div>
                      </>
                    ):(
                      <>
                      <div style={{textAlign: 'right'}}>
                        <Box >
                          <ThemeProvider theme={theme}>
                            <Button onClick={this.updateBook} startIcon={<SaveIcon />} variant="contained" color="primary" type="save" >
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
                  </form>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs/>
            </Grid>
            </Card>
            </Grid>
            <Grid item xs={1}/>
            </Grid>
            </>
      </>
    );
  }
}
export default AddBook