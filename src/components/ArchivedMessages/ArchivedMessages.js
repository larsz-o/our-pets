import React, { Component } from 'react';
import {ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, Paper, Avatar} from '@material-ui/core';
import ExpandMore from '@material-ui/icons/ExpandMore'; 
import moment from 'moment'; 
import {connect} from 'react-redux'; 

const mapStateToProps = state => ({
    user: state.user,
    archivedMessages: state.inbox.archivedMessages
  });
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
                      <ExpansionPanelSummary expandIcon={<ExpandMore/>}>
                      <Avatar
                            alt="test"
                            src={oldMessage.user_photo}
                            className="avatar"/>
                        <span className="message-margin"> {oldMessage.sender} </span> {oldMessage.subject} </ExpansionPanelSummary>
                      <ExpansionPanelDetails>{moment(oldMessage.date).format('MM-DD-YYYY')}</ExpansionPanelDetails>
                      <ExpansionPanelDetails>{oldMessage.message}</ExpansionPanelDetails>
                      </ExpansionPanel>
               );
             })}
             </ExpansionPanel>
           </Paper>
        );
    }
}
export default connect(mapStateToProps)(ArchivedMessages);