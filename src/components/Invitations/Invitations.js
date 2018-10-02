import React, { Component } from 'react';
import {Badge, ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, Avatar, Button} from '@material-ui/core';
import ExpandMore from '@material-ui/icons/ExpandMore'; 
import moment from 'moment'; 
import swal from 'sweetalert';
import {connect} from 'react-redux';
import axios from 'axios';

const mapStateToProps = state => ({
  user: state.user,
  invitations: state.inbox.invitations
});
class InvitationsMessages extends Component {
// accept will send a PUT request authorizing the member as a household member 
  // then, the message will be archived the user's inbox
  acceptInvitation = (invite) => {
    axios({
      method: 'POST',
      url: '/api/household/accept', 
      data: {user_id: invite.sender_id, authorized: true, household_id: invite.household_id}
    }).then((response) => {
      swal('Success!', 'Invitation accepted!', 'success'); 
      this.archiveMessage(invite.id);
    }).catch((error) => {
      console.log('Error accepting invitation', error);
    })
  }
  archiveMessage = (messageID) => {
    let id= {id: messageID};
    axios({
      method: 'PUT', 
      url: '/api/inbox', 
      data: {id: messageID}
    }).then((response) => {
      console.log('success!');
    }).catch((error) => {
      console.log('Error archiving message', error);
    })
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
                      <ExpansionPanelSummary expandIcon={<ExpandMore/>}><span className="bold">
                      <Avatar
                            alt="test"
                            src={invite.user_photo}
                            className="avatar"/>
                            {invite.sender}:</span> {invite.subject} - {moment(invite.date).format('MM-DD-YYYY')}</ExpansionPanelSummary>
                      <ExpansionPanelDetails>{invite.message}</ExpansionPanelDetails>
                      <Button color="primary" onClick={()=>this.acceptInvitation(invite)}>Accept</Button>
                      <Button onClick={()=>this.acceptInvitation(invite)}>Decline</Button>
                      </ExpansionPanel>
               );
             })}
             </ExpansionPanel>
           </div>
        );
    }
}
export default connect(mapStateToProps)(InvitationsMessages);