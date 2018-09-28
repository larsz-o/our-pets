import React, { Component } from 'react';
import '../Inbox/inbox.css';
import {ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, Paper} from '@material-ui/core';
import ExpandMore from '@material-ui/icons/ExpandMore'; 
import moment from 'moment';
import {connect} from 'react-redux';

const mapStateToProps = state => ({
    user: state.user,
    sentMessages: state.inbox.sentMessages
  });
class SentMessages extends Component {

    render(){
        return(
            <Paper>
            <ExpansionPanel>
            <ExpansionPanelSummary className="bold center" expandIcon={<ExpandMore/>}><span className="center">Sent </span>
            </ExpansionPanelSummary>
                    {this.props.sentMessages.map((sentMessage, i) => {
                    return(
                       <ExpansionPanel key={i}>
                      <ExpansionPanelSummary expandIcon={<ExpandMore/>}>To:  <span className="message-margin"> {sentMessage.receiver} </span> Subject: {sentMessage.subject} </ExpansionPanelSummary>
                      <ExpansionPanelDetails>{moment(sentMessage.date).format('MM-DD-YYYY')}</ExpansionPanelDetails>
                      <ExpansionPanelDetails>{sentMessage.message}</ExpansionPanelDetails>
                      </ExpansionPanel>
               );
             })}
             </ExpansionPanel>
           </Paper>
        );
    }
}
export default connect(mapStateToProps)(SentMessages);