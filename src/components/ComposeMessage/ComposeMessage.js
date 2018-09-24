import React, {Component} from 'react';
import {Button, Dialog, DialogTitle, DialogContent, DialogContentText, Input} from '@material-ui/core';
import axios from 'axios';
import swal from 'sweetalert';
import {connect} from 'react-redux'; 
import { USER_ACTIONS } from '../../redux/actions/userActions';


const mapStateToProps = state => ({
    user: state.user,
    household: state.householdBuilder.findHousehold,
    nextPage: state.nextPage.nextPage
  });

class ComposeMessage extends Component {
    constructor(props){
        super(props);
        this.state = {
            open: false,
            search_term: '', 
            receiver: '',
            message: ''
          };
    }
    componentDidMount() {
        this.props.dispatch({type: USER_ACTIONS.FETCH_USER});
      }
      componentDidUpdate() {
        if (!this.props.user.isLoading && this.props.user.userName === null) {
          this.props.dispatch({type: 'NEXT_PAGE', payload: '/inbox'});
          this.props.history.push(this.props.nextPage);
        }
      }
    handleClickOpen = () => {
        console.log('clicked');
        this.setState({ open: true });
      };
    
    handleClose = () => {
        this.setState({ open: false });
      };
    handleInputChangeFor = propertyName => (event) => { 
        this.setState({
          [propertyName]: event.target.value,
        });
      }
//searchForUsers queries the database for the entered search term and adds the results to an array in local state
  searchForUsers = () => {
    let searchTerm = this.state.search_term; 
    console.log(searchTerm); 
  axios({
      method: 'GET',
      url: `/api/household/user?username=${searchTerm}`
  }).then((response) => {
      let userToAdd = response.data;
      console.log(userToAdd);
      if (userToAdd.username !== ''){
      this.setState({
          receiver: userToAdd[0]
      }); 
  } else {
    swal(':(', 'Could not find user.', 'warning'); 
  }
  }).catch((error) => { 
      console.log('Error finding user', error); 
  })
} // end searchForUsers
sendMessage = () => {
    this.setState({
        open: false
    });
    let date = new Date(); 
    axios({
        method: 'POST', 
        url: 'api/inbox', 
        data: {receiver: this.state.receiver.id, message: this.state.message, date: date}
    }).then((response) => {
        swal('Success!', 'Message sent!', 'success');
    }).catch((error) => {
        swal('Oh no!', 'Error sending message', 'warning'); 
    });
}
    render(){
        return(
            <div className="right">
            <Button size="small" onClick={this.handleClickOpen} variant="outlined">Compose New Message</Button>
            <Dialog 
                open={this.state.open}
                onClose={this.handleClose}
                aria-labelledby="compose-message-title">
                <DialogTitle id="compose-message-title">
                    New Message
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>Send a mesage to another registered user.</DialogContentText>
                </DialogContent>
                <DialogContent>
                    <DialogContentText>Find user:</DialogContentText>
                    <Input type="text" placeholder="Search by username" value={this.state.search_term} onChange={this.handleInputChangeFor('search_term')}/>
                    <Button onClick={this.searchForUsers}>Search</Button>
                </DialogContent>
                <DialogContent>
                    <DialogContentText>To: {this.state.receiver.username}</DialogContentText>
                </DialogContent>
                <DialogContent>
                    Message: <Input value={this.state.message} onChange={this.handleInputChangeFor('message')}/>
                </DialogContent>
                <DialogContent>
                    <Button onClick={this.handleClose}>Cancel</Button><Button onClick={this.sendMessage}>Send</Button>
                </DialogContent>
            </Dialog>
            </div>
        );
    }
}
export default connect(mapStateToProps)(ComposeMessage); 