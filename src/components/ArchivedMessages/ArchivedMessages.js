import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import '../Inbox/inbox.css';
import {ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, Typography} from '@material-ui/core';
import ExpandMore from '@material-ui/icons/ExpandMore'; 
import { USER_ACTIONS } from '../../redux/actions/userActions';
import moment from 'moment'; 

const mapStateToProps = state => ({
    user: state.user,
  });
class ArchivedMessages extends Component {
    constructor(props){
        super(props);
        this.state = {
          archivedMessages: []
        }
      }
componentDidMount() {
    this.props.dispatch({type: USER_ACTIONS.FETCH_USER});
    // this.getArchivedMessages();
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
    render(){
        return(
        <div>
            <ExpansionPanel>
            <ExpansionPanelSummary className="bold" expandIcon={<ExpandMore/>}>Archived Messages</ExpansionPanelSummary>
                    {this.state.archivedMessages.map((oldMessage, i) => {
                    return(
                       <ExpansionPanel key={i}>
                      <ExpansionPanelSummary expandIcon={<ExpandMore/>}>From: {oldMessage.sender} - {moment(oldMessage.date).format('MM-DD-YYYY')}</ExpansionPanelSummary>
                      <ExpansionPanelDetails>{oldMessage.message}</ExpansionPanelDetails>
                      </ExpansionPanel>
               );
             })}
             </ExpansionPanel>
           </div>
        );
    }
}
export default connect(mapStateToProps)(ArchivedMessages);