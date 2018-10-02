import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment'; 
import {Badge, Button, Avatar, ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, Dialog, DialogTitle, DialogContent, InputLabel, Input, Paper, TextField} from '@material-ui/core';
import ExpandMore from '@material-ui/icons/ExpandMore'; 
import { USER_ACTIONS } from '../../redux/actions/userActions';
import ReactFilestack from 'filestack-react';
import axios from 'axios';
import swal from 'sweetalert';

const mapStateToProps = state => ({
    user: state.user,
    nextPage: state.nextPage.nextPage,
    messages: state.inbox.newMessages
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
      open: false,
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
      console.log('success!');
      this.props.getArchivedMessages();
    }).catch((error) => {
      console.log('Error archiving message', error);
    })
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
  this.setState({
    [property]: event.target.value,
  });
}
//reply to sender 
reply = (message) => {
  this.setState({
    receiver: message.sender_id,
    receiver_name: message.sender, 
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
    url: '/api/inbox', 
    data: {receiver: this.state.receiver, subject: this.state.subject, message: this.state.message, date: date, invitation: false, image_path: this.state.image_path}
  }).then((response) => {
    swal('Success!', 'Message sent!', 'success');
    this.props.getSentMessages();
  }).catch((error) => {
    console.log('Error sending message', error);
  })
}
    render(){
        return(
            <Paper className="inbox-div"> 
            <ExpansionPanel>
            <ExpansionPanelSummary className="bold" expandIcon={<ExpandMore/>}>
              <Badge
                badgeContent={this.props.messages.length}
                color="secondary">New Messages
              </Badge>
            </ExpansionPanelSummary>
               {this.props.messages.map((message, i) => {
                 if(message.image_path !== null){
                 return (
                   <div key={i}>
                   <div>
                   <ExpansionPanel>
                    <ExpansionPanelSummary expandIcon={<ExpandMore/>}> 
                            <Avatar
                            alt="test"
                            src={message.user_photo}
                            className="avatar"/>
                            <span className="message-margin">  {message.sender} </span> {message.subject} </ExpansionPanelSummary>
                       <ExpansionPanelDetails>{moment(message.date).format('MM-DD-YYYY')}</ExpansionPanelDetails>
                       <ExpansionPanelDetails>{message.message}</ExpansionPanelDetails>
                       <ExpansionPanelDetails><img src={message.image_path} alt="message attachment"/></ExpansionPanelDetails>
                       <Button color="primary" onClick={()=>this.reply(message)}>Reply</Button>
                       <Button onClick={()=>this.archiveMessage(message.id)}>Archive</Button>
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
                     To: {this.state.receiver_name}
                 </DialogContent>
                 <DialogContent>
                     <InputLabel>Subject: </InputLabel><Input value={this.state.subject} onChange={(event)=>this.handleInputChangeFor('subject', event)}/><br/>
                    <InputLabel>Message: </InputLabel><TextField value={this.state.message} onChange={(event)=>this.handleInputChangeFor('message', event)}/><br/>
                     <ReactFilestack
                         apikey='ACGkY2eEqTDG52A5eOG3Az'
                         buttonText="Upload picture"
                         buttonClass="filestackButton"
                         options={options}
                         onSuccess={this.getPictureURL}/>
                 </DialogContent>
                 <DialogContent>
                     <Button onClick={this.handleClose}>Cancel</Button><Button color="primary" onClick={this.sendMessage}>Send</Button>
                 </DialogContent>
             </Dialog>
             </div>
                 );
                } else {
                  return (
                    <div key={i}>
                   <div>
                   <ExpansionPanel>
                       <ExpansionPanelSummary expandIcon={<ExpandMore/>}>
                       <Avatar
                            alt="test"
                            src={message.user_photo}
                            className="avatar"/>
                            <span className="message-margin"> {message.sender} </span> {message.subject} </ExpansionPanelSummary>
                       <ExpansionPanelDetails>{moment(message.date).format('MM-DD-YYYY')}</ExpansionPanelDetails>
                       <ExpansionPanelDetails>{message.message}</ExpansionPanelDetails>
                       <Button color="primary" onClick={()=>this.reply(message)}>Reply</Button>
                       <Button onClick={()=>this.archiveMessage(message.id)}>Archive</Button>
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
                     To: {this.state.receiver_name}
                 </DialogContent>
                 <DialogContent>
                     <InputLabel>Subject: </InputLabel><Input value={this.state.subject} onChange={(event)=>this.handleInputChangeFor('subject', event)}/><br/>
                    <InputLabel>Message: </InputLabel><TextField value={this.state.message} onChange={(event)=>this.handleInputChangeFor('message', event)}/><br/>
                     <ReactFilestack
                         apikey='ACGkY2eEqTDG52A5eOG3Az'
                         buttonText="Upload picture"
                         buttonClass="filestackButton"
                         options={options}
                         onSuccess={this.getPictureURL}/>
                 </DialogContent>
                 <DialogContent>
                     <Button onClick={this.handleClose}>Cancel</Button><Button color="primary" onClick={this.sendMessage}>Send</Button>
                 </DialogContent>
             </Dialog>
             </div>
                  );
                }
               })}
               </ExpansionPanel>
            </Paper>
        );
    }
}
export default connect(mapStateToProps)(NewMessages);