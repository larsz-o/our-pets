import React, { Component } from 'react';
import { connect } from 'react-redux';
import Nav from '../Nav/Nav';
import ComposeMessage from '../ComposeMessage/ComposeMessage';
import ArchivedMessages from '../ArchivedMessages/ArchivedMessages'
import NewMessages from '../NewMessages/NewMessages'; 
import SentMessages from '../SentMessages/SentMessages';
import Invitations from '../Invitations/Invitations';
import { USER_ACTIONS } from '../../redux/actions/userActions';
import {Paper, Typography} from '@material-ui/core';
import axios from 'axios';

const mapStateToProps = state => ({
  user: state.user,
  totalHouseholds: state.allHouseholds.totalUserHouseholds,
  messages: state.inbox.newMessages
});
class Inbox extends Component {
  constructor(props){
    super(props);
    this.state = {
      household_members: [], 
    }
  }
  componentDidMount() {
    this.props.dispatch({type: USER_ACTIONS.FETCH_USER});
    this.getMessages();
    this.getArchivedMessages(); 
    this.getSentMessages();
    this.getInvitations();
}
  componentDidUpdate() {
    if (!this.props.user.isLoading && this.props.user.userName === null) {
      this.props.history.push('/home');
    }
  }
//gets sent messages
getSentMessages = () => {
  axios({
    method: 'GET', 
    url: '/api/inbox/sent/'
  }).then((response) => {
    this.props.dispatch({type: 'SET_SENT_MESSAGES', payload: response.data});
  }).catch((error) => {
    console.log('Error getting sent messages', error); 
  })
}
//get archived messages
getArchivedMessages = () => {
  axios({
    method: 'GET', 
    url: '/api/inbox?archived=true&invitation=false'
  }).then((response) => {
    this.props.dispatch({type: 'SET_ARCHIVED_MESSAGES', payload: response.data});
  }).catch((error) => {
    console.log('Error getting archived messages', error); 
  })
}
  //gets current messages when component mounts 
getMessages = () => {
  axios({
    method: 'GET', 
    url: `/api/inbox?archived=false&invitation=false`
  }).then((response) => {
    this.props.dispatch({type: 'SET_NEW_MESSAGES', payload: response.data});
  }).catch((error) => {
    console.log('Error getting archived messages', error); 
  })
}
  //gets invitations when component mounts 
  getInvitations = () => {
    axios({
      method: 'GET', 
      url: `/api/inbox?archived=false&invitation=true`
    }).then((response) => {
      this.props.dispatch({type: 'SET_INVITATIONS', payload: response.data});
    }).catch((error) => {
      console.log('Error getting archived messages', error); 
    })
  }
  render() {
    let content = null;
    if (this.props.user.userName && this.props.messages.length > 0) {
      content = (
       <div className="container">
        <Paper>
          <ComposeMessage getSentMessages={this.getSentMessages}/>
          <NewMessages getSentMessages={this.getSentMessages} getArchivedMessages={this.getArchivedMessages}/>
          <Invitations />
          <ArchivedMessages />
          <SentMessages />
          </Paper>
    
      </div>
        );
    } else if (this.props.user.userName && this.props.messages.length === 0){
      content = (
      <div className="container">
        <Paper>
          <ComposeMessage getSentMessages={this.getSentMessages} />
          <Typography>No new messages.</Typography>
          <Invitations />
          <ArchivedMessages />
          <SentMessages />
           </Paper>
      </div>
      );
    }
    return (
      <div>
        <Nav />
        { content }
      </div>
    );
  }
}

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(Inbox); 