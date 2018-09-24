import React, { Component } from 'react';
import { connect } from 'react-redux';
import Nav from '../Nav/Nav';
import { USER_ACTIONS } from '../../redux/actions/userActions';
import {Button, ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails} from '@material-ui/core';
import ExpandMore from '@material-ui/icons/ExpandMore'; 
import './inbox.css';
import axios from 'axios';
import swal from 'sweetalert'; 

const mapStateToProps = state => ({
  user: state.user,
  pets: state.currentHousehold.currentPets,
  members: state.currentHousehold.currentHouseholdMembers
});

class EditSettings extends Component {
  constructor(props){
    super(props);
    this.state = {
      messages: [],
      archivedMessages: []
    }
  }
  componentDidMount() {
    this.props.dispatch({type: USER_ACTIONS.FETCH_USER});
    this.getMessages();
    this.getArchivedMessages();
  }
  componentDidUpdate() {
    if (!this.props.user.isLoading && this.props.user.userName === null) {
      this.props.history.push('/home');
    }
  }
  // accept will send a PUT request authorizing the member as a household member 
  // then, the message will be archived the user's inbox
  acceptInvitation = (messageID) => {
    axios({
      method: 'PUT', 
      url: '/api/household/accept',
      data: {authorized: true, household_id: this.props.user.household_id}
    }).then((response) => {
      console.log(response.data);
      swal('Nice!', 'Invitation accepted!', 'success');
      this.archiveMessage(messageID);
    }).catch((error) => {
      console.log('Error changing authorization', error); 
    });
  }
  //changes the status of a message to archived, then adds it to the archived message array on state
  archiveMessage = (messageID) => {
   axios({
      method: 'PUT', 
      url: '/api/inbox',
      data: {id: messageID}
    }).then((response) => {
      this.getArchivedMessages();
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
      swal('Invitation declined!', {
        icon: 'success',
      });
      this.archiveMessage(messageID)
    } else {
      swal('You can keep thinking about this one.');
    }
  });
}
//gets old messages upon component mounting successfully
getArchivedMessages = () => {
  axios({
    method: 'GET',
    url: '/api/inbox?archived=true'
  }).then((response) => {
    this.setState({
      archivedMessages: response.data
    });
  }).catch((error) => {
    console.log('Error getting messages', error); 
  });
}
//gets current messages when component mounts 
  getMessages = () => {
    axios({
      method: 'GET',
      url: '/api/inbox?archived=false'
    }).then((response) => {
      this.setState({
        messages: response.data
      });
    }).catch((error) => {
      console.log('Error getting messages', error); 
    });
  }
  render() {
    let content = null;
    if (this.props.user.userName && this.state.messages.length > 0) {
      content = (
        <div>
          <Button variant="contained">Compose New Message</Button>
          {/* create a dialog form with Material UI to send a short message to another user. this should definitely be a separate component */}
           <div> 
              {this.state.messages.map((message, i) => {
                return (
                  <div>
                  <h3>New Messages: </h3>
                  <div key={i} className="inbox-card">
                    <h3 className="headline">Message from {message.sender}</h3>
                    {message.message}
                    <br/><br/>
                  <Button variant="contained" color="primary" size="small" onClick={()=>this.acceptInvitation(message.id)}>Accept</Button>  <Button size="small" variant="contained" onClick={() => this.declineInvitation(message.id)}>Decline</Button>
                  </div>
                </div>
                );
              })}
           </div>
           <div>
           <h3>Archived Messages: </h3>
             {this.state.archivedMessages.map((oldMessage, i) => {
               return(
                <div key={i}>
                    <ExpansionPanel>
                      <ExpansionPanelSummary>Message from {oldMessage.sender}<span className="float-right"><ExpandMore/></span></ExpansionPanelSummary>
                      <ExpansionPanelDetails>{oldMessage.message}</ExpansionPanelDetails>
                    </ExpansionPanel>
                  </div>
               );
             })}
           </div>
        </div>
      );
    } else if (this.props.user.userName && this.state.messages.length === 0){
      content = (
        <div>
          <Button variant="contained">Compose New Message</Button>
          <p>No new messages.</p>
          <h3>Archived Messages: </h3>
             {this.state.archivedMessages.map((oldMessage, i) => {
               return(
                <div key={i}>
                    <ExpansionPanel>
                      <ExpansionPanelSummary>Message from {oldMessage.sender}<span className="float-right"><ExpandMore/></span></ExpansionPanelSummary>
                      <ExpansionPanelDetails>{oldMessage.message}</ExpansionPanelDetails>
                    </ExpansionPanel>
                </div>
               );
             })}
           </div>
      );
    }
    return (
      <div>
        <Nav />
        { content }
      </div>
    );
  }
}

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(EditSettings); 