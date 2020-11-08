import React, { Component } from 'react'
import Container from './container';

 class Home extends Component {
  constructor(props){
    super(props);
    this.state={
      content:"",
      content1:""
    };
  }

componentDidMount(){
  this.setState({
    content:"Welcome to Book Shop",
    content1:"Good friends,good books,and a sleepy conscience:this is the ideal life. ",
    content2:"-Mark Twain"
  });
}
render(){
  return(
    <>
        <Container content={this.state.content}content1={this.state.content1}content2={this.state.content2}></Container>
        </>
  );
}


}
export default Home