import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import '../Inbox/inbox.css';
import moment from 'moment'; 
import swal from 'sweetalert'; 
import {Button, ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, Typography} from '@material-ui/core';
import ExpandMore from '@material-ui/icons/ExpandMore'; 
import { USER_ACTIONS } from '../../redux/actions/userActions';

const mapStateToProps = state => ({
    user: state.user,
    pets: state.currentHousehold.currentPets,
    members: state.currentHousehold.currentHouseholdMembers, 
    nextPage: state.nextPage.nextPage
  });
class NewMessages extends Component {
  
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
    render(){
        return(
            <div> 
            <ExpansionPanel>
            <ExpansionPanelSummary className="bold" expandIcon={<ExpandMore/>}>New Messages</ExpansionPanelSummary>
               {this.props.messages.map((message, i) => {
                 return (
                   <div key={i}>
                   <ExpansionPanel >
                       <ExpansionPanelSummary expandIcon={<ExpandMore/>}><span className="bold">{message.sender}:</span> {message.subject} - {moment(message.date).format('MM-DD-YYYY')}</ExpansionPanelSummary>
                       <ExpansionPanelDetails>{message.message}</ExpansionPanelDetails>
                       <Button variant="contained" color="primary" size="small" onClick={()=>this.archiveMessage(message.id)}>Archive</Button>
                     </ExpansionPanel>
                 </div>
                 );
               })}
               </ExpansionPanel>
            </div>
        );
    }
}
export default connect(mapStateToProps)(NewMessages);