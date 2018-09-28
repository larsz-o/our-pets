import React, { Component } from 'react';
import '../Inbox/inbox.css';
import {Badge, ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, Typography, Button} from '@material-ui/core';
import ExpandMore from '@material-ui/icons/ExpandMore'; 
import moment from 'moment'; 
import swal from 'sweetalert';
import {connect} from 'react-redux';

const mapStateToProps = state => ({
  user: state.user,
  invitations: state.inbox.invitations
});
class InvitationsMessages extends Component {
// accept will send a PUT request authorizing the member as a household member 
  // then, the message will be archived the user's inbox
  acceptInvitation = (invite) => {
    this.props.dispatch({type: 'ACCEPT_INVITATION', payload: {authorized: true, household_id: invite.household_id}})
  }
  archiveMessage = (messageID) => {
    this.props.dispatch({type: 'ARCHIVE_MESSAGE', payload: {id: messageID}});
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
                      <ExpansionPanelSummary expandIcon={<ExpandMore/>}><span className="bold">{invite.sender}:</span> {invite.subject} - {moment(invite.date).format('MM-DD-YYYY')}</ExpansionPanelSummary>
                      <ExpansionPanelDetails>{invite.message}</ExpansionPanelDetails>
                      <Button variant="contained" color="primary" size="small" onClick={()=>this.acceptInvitation(invite)}>Accept</Button>
                      <Button variant="contained" size="small" onClick={()=>this.acceptInvitation(invite)}>Decline</Button>
                      </ExpansionPanel>
               );
             })}
             </ExpansionPanel>
           </div>
        );
    }
}
export default connect(mapStateToProps)(InvitationsMessages);