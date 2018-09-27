import React, { Component } from 'react';
import '../Inbox/inbox.css';
import {Badge, ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, Paper} from '@material-ui/core';
import ExpandMore from '@material-ui/icons/ExpandMore'; 
import moment from 'moment';

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
                      <ExpansionPanelSummary expandIcon={<ExpandMore/>}><span>To: {sentMessage.receiver}:</span>{sentMessage.subject} - {moment(sentMessage.date).format('MM-DD-YYYY')}</ExpansionPanelSummary>
                      <ExpansionPanelDetails>{sentMessage.message}</ExpansionPanelDetails>
                      </ExpansionPanel>
               );
             })}
             </ExpansionPanel>
           </Paper>
        );
    }
}
export default SentMessages;