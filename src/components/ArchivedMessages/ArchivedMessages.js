import React, { Component } from 'react';
import '../Inbox/inbox.css';
import {Badge, ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, Paper} from '@material-ui/core';
import ExpandMore from '@material-ui/icons/ExpandMore'; 
import moment from 'moment'; 

class ArchivedMessages extends Component {
    render(){
        return(
        <Paper>
            <ExpansionPanel>
            <ExpansionPanelSummary className="bold" expandIcon={<ExpandMore/>}><span className="float-left">Archived</span>
            </ExpansionPanelSummary>
                    {this.props.archivedMessages.map((oldMessage, i) => {
                    return(
                       <ExpansionPanel key={i}>
                      <ExpansionPanelSummary expandIcon={<ExpandMore/>}><span>{oldMessage.sender}:</span> {oldMessage.subject} - {moment(oldMessage.date).format('MM-DD-YYYY')}</ExpansionPanelSummary>
                      <ExpansionPanelDetails>{oldMessage.message}</ExpansionPanelDetails>
                      </ExpansionPanel>
               );
             })}
             </ExpansionPanel>
           </Paper>
        );
    }
}
export default ArchivedMessages;