import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import '../Inbox/inbox.css';
import moment from 'moment'; 
import swal from 'sweetalert'; 
import {Button, ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, Dialog, DialogTitle, DialogContent, InputLabel, Input} from '@material-ui/core';
import ExpandMore from '@material-ui/icons/ExpandMore'; 
import { USER_ACTIONS } from '../../redux/actions/userActions';
import ReactFilestack from 'filestack-react';

const mapStateToProps = state => ({
    user: state.user,
    pets: state.currentHousehold.currentPets,
    members: state.currentHousehold.currentHouseholdMembers, 
    nextPage: state.nextPage.nextPage
  });
  const options = {
    accept: 'image/*',
    maxFiles: 1,
    storeTo: {
      location: 's3',
    },
  };
class NewMessages extends Component {
  constructor(props){
    super(props);
    this.state = {
      subject: '', 
      message: '', 
      receiver: '',
      image_path: '', 
      open: false
    }
  }
    componentDidMount() {
        this.props.dispatch({type: USER_ACTIONS.FETCH_USER});
      }
  //changes the status of a message to archived, then adds it to the archived message array on state
  archiveMessage = (messageID) => {
   axios({
      method: 'PUT', 
      url: '/api/inbox',
      data: {id: messageID}
    }).then((response) => {
      console.log('Message archived.');
    }).catch((error) => {
      console.log('Error archving message', error); 
    });
  }
  //decline will archive the message if confirmed
  declineInvitation = (messageID) => {
    swal({
      title: 'Are you sure?',
      icon: 'warning', 
      buttons: true,
      dangerMode: true
  }).then((willDelete) => {
    if (willDelete){
      swal('Message Deleted!', {
        icon: 'success',
      });
      this.archiveMessage(messageID)
    } else {
      swal('You can keep thinking about this one.');
    }
  });
}
// if successful, saves the URL for the uploaded picture
getPictureURL = (result) => {
  let url = result.filesUploaded[0].url; 
  this.setState({
    image_path: url
  });
}
handleClose = () => {
  this.setState({ open: false });
};
handleInputChangeFor = (property, event) => { 
  console.log(event.target);
  this.setState({
    [property]: event.target.value,
  });
}
//reply to sender 
reply = (message) => {
  this.setState({
    receiver: message.sender, 
    open: true
  });
}
sendMessage = () => {
  this.setState({
      open: false
  });
  let date = new Date(); 
  axios({
      method: 'POST', 
      url: 'api/inbox', 
      data: {receiver: this.state.receiver, subject: this.state.subject, message: this.state.message, date: date, invitation: false, image_path: this.state.image_path}
  }).then((response) => {
      swal('Success!', 'Message sent!', 'success');
      this.setState({
          message: '',
          receiver: '', 
          subject: '', 
          image_path: ''
      });
  }).catch((error) => {
      swal('Oh no!', 'Error sending message', 'warning'); 
      console.log('Error sending message', error); 
  });
}
    render(){
        return(
            <div> 
            <ExpansionPanel>
            <ExpansionPanelSummary className="bold" expandIcon={<ExpandMore/>}>New Messages</ExpansionPanelSummary>
               {this.props.messages.map((message, i) => {
                 return (
                   <div key={i}>
                   <div>
                   <ExpansionPanel>
                       <ExpansionPanelSummary expandIcon={<ExpandMore/>}> From: <span className="bold"> {message.sender} </span> "{message.subject}"  {moment(message.date).format('MM-DD-YYYY')}</ExpansionPanelSummary>
                       <ExpansionPanelDetails>{message.message}</ExpansionPanelDetails>
                       <ExpansionPanelDetails><img src={message.image_path} alt="message attachment"/></ExpansionPanelDetails>
                       <Button variant="contained" color="primary" size="small" onClick={()=>this.reply(message)}>Reply</Button>
                       <Button variant="contained" size="small" onClick={()=>this.archiveMessage(message.id)}>Archive</Button>
                     </ExpansionPanel>
                 </div>
                 <Dialog 
                 open={this.state.open}
                 onClose={this.handleClose}
                 aria-labelledby="compose-message-title">
                 <DialogTitle id="compose-message-title">
                     New Message
                 </DialogTitle>
                 <DialogContent>
                     To: {this.state.receiver}
                 </DialogContent>
                 <DialogContent>
                     <InputLabel>Subject: </InputLabel> <Input value={this.state.subject} onChange={(event)=>this.handleInputChangeFor('subject', event)}/><br/>
                    <InputLabel>Message: </InputLabel>  <Input value={this.state.message} onChange={(event)=>this.handleInputChangeFor('message', event)}/><br/>
                     <ReactFilestack
                         apikey='ACGkY2eEqTDG52A5eOG3Az'
                         buttonText="Upload picture"
                         buttonClass="filestackButton"
                         options={options}
                         onSuccess={this.getPictureURL}/>
                 </DialogContent>
                 <DialogContent>
                     <Button variant="outlined" color="secondary" onClick={this.handleClose}>Cancel</Button><Button variant="outlined" color="primary" onClick={this.sendMessage}>Send</Button>
                 </DialogContent>
             </Dialog>
             </div>
                 );
               })}
               </ExpansionPanel>
            </div>
        );
    }
}
export default connect(mapStateToProps)(NewMessages);