import React, { Component } from 'react';
import '../Inbox/inbox.css';
import {ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails} from '@material-ui/core';
import ExpandMore from '@material-ui/icons/ExpandMore'; 
import moment from 'moment';

class SentMessages extends Component {

    render(){
        return(
            <div>
            <ExpansionPanel>
            <ExpansionPanelSummary className="bold" expandIcon={<ExpandMore/>}>Sent Messages</ExpansionPanelSummary>
                    {this.props.sentMessages.map((sentMessage, i) => {
                    return(
                       <ExpansionPanel key={i}>
                      <ExpansionPanelSummary expandIcon={<ExpandMore/>}><span className="bold">To: {sentMessage.receiver}:</span>{sentMessage.subject} - {moment(sentMessage.date).format('MM-DD-YYYY')}</ExpansionPanelSummary>
                      <ExpansionPanelDetails>{sentMessage.message}</ExpansionPanelDetails>
                      </ExpansionPanel>
               );
             })}
             </ExpansionPanel>
           </div>
        );
    }
}
export default SentMessages;