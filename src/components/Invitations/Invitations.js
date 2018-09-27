import React, { Component } from 'react';
import '../Inbox/inbox.css';
import {Badge, ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, Typography, Button} from '@material-ui/core';
import ExpandMore from '@material-ui/icons/ExpandMore'; 
import moment from 'moment'; 
import axios from 'axios';
import swal from 'sweetalert';

class InvitationsMessages extends Component {
// accept will send a PUT request authorizing the member as a household member 
  // then, the message will be archived the user's inbox
  acceptInvitation = (invite) => {
    axios({
      method: 'PUT', 
      url: '/api/household/accept',
      data: {authorized: true, household_id: invite.household_id}
    }).then((response) => {
      console.log(response.data);
      swal('Done!', 'Message archived!', 'success');
      this.archiveMessage(invite.id);
    }).catch((error) => {
      console.log('Error changing authorization', error); 
    });
  }
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
    render(){
        return(
        <div>
            <ExpansionPanel>
            <ExpansionPanelSummary className="bold" expandIcon={<ExpandMore/>}>
            <Badge
                badgeContent={this.props.invitations.length}
                color="secondary"><span className="float-left">Invitations</span></Badge>
            </ExpansionPanelSummary>
                    {this.props.invitations.map((invite, i) => {
                    return(
                       <ExpansionPanel key={i}>
                      <ExpansionPanelSummary expandIcon={<ExpandMore/>}><span className="bold">{invite.sender}:</span> {invite.subject} - {moment(invite.date).format('MM-DD-YYYY')}</ExpansionPanelSummary>
                      <ExpansionPanelDetails>{invite.message}</ExpansionPanelDetails>
                      <Button variant="contained" color="primary" size="small" onClick={()=>this.acceptInvitation(invite)}>Archive</Button>
                      </ExpansionPanel>
               );
             })}
             </ExpansionPanel>
           </div>
        );
    }
}
export default InvitationsMessages;