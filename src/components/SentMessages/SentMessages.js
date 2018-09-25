import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import '../Inbox/inbox.css';
import {ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails} from '@material-ui/core';
import ExpandMore from '@material-ui/icons/ExpandMore'; 
import { USER_ACTIONS } from '../../redux/actions/userActions';
import moment from 'moment';

const mapStateToProps = state => ({
    user: state.user,
  });
class SentMessages extends Component {
    constructor(props){
        super(props);
        this.state = {
          sentMessages: []
        }
      }
componentDidMount() {
    this.props.dispatch({type: USER_ACTIONS.FETCH_USER});
    this.getArchivedMessages();
}
//gets old messages upon component mounting successfully
getArchivedMessages = () => {
    axios({
      method: 'GET',
      url: '/api/inbox/sent'
    }).then((response) => {
      this.setState({
        sentMessages: response.data
      });
    }).catch((error) => {
      console.log('Error getting sent messages', error); 
    });
  }
    render(){
        return(
            <div>
            <ExpansionPanel>
            <ExpansionPanelSummary className="bold" expandIcon={<ExpandMore/>}>Sent Messages</ExpansionPanelSummary>
                    {this.state.sentMessages.map((sentMessage, i) => {
                    return(
                       <ExpansionPanel key={i}>
                      <ExpansionPanelSummary expandIcon={<ExpandMore/>}>From: {sentMessage.sender} - {moment(sentMessage.date).format('MM-DD-YYYY')}</ExpansionPanelSummary>
                      <ExpansionPanelDetails>{sentMessage.message}</ExpansionPanelDetails>
                      </ExpansionPanel>
               );
             })}
             </ExpansionPanel>
           </div>
        );
    }
}
export default connect(mapStateToProps)(SentMessages);