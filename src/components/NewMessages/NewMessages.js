import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../Inbox/inbox.css';
import moment from 'moment'; 
import {Badge, Button, Avatar, ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, Dialog, DialogTitle, DialogContent, InputLabel, Input, Paper, TextField} from '@material-ui/core';
import ExpandMore from '@material-ui/icons/ExpandMore'; 
import { USER_ACTIONS } from '../../redux/actions/userActions';
import ReactFilestack from 'filestack-react';

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
    this.props.dispatch({type: 'ARCHIVE_MESSAGE', payload: {id: messageID}});
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
  console.log(message);
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
  this.props.dispatch({type: 'POST_MESSAGE', payload: {receiver: this.state.receiver, subject: this.state.subject, message: this.state.message, date: date, invitation: false, image_path: this.state.image_path}});
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
                     <Button variant="outlined" color="secondary" onClick={this.handleClose}>Cancel</Button><Button variant="outlined" color="primary" onClick={this.sendMessage}>Send</Button>
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
                            <span className="message-margin"> {message.sender} </span> Subject: {message.subject} </ExpansionPanelSummary>
                       <ExpansionPanelDetails>{moment(message.date).format('MM-DD-YYYY')}</ExpansionPanelDetails>
                       <ExpansionPanelDetails>{message.message}</ExpansionPanelDetails>
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
                     <Button variant="outlined" color="secondary" onClick={this.handleClose}>Cancel</Button><Button variant="outlined" color="primary" onClick={this.sendMessage}>Send</Button>
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