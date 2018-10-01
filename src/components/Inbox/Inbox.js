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
  this.props.dispatch({type: 'FETCH_SENT_MESSAGES'});
}
//get archived messages
getArchivedMessages = () => {
  this.props.dispatch({type: 'FETCH_ARCHIVED_MESSAGES'});
}
  //gets current messages when component mounts 
getMessages = () => {
    this.props.dispatch({type: 'FETCH_NEW_MESSAGES'});
  }
  //gets invitations when component mounts 
getInvitations = () => {
    this.props.dispatch({type: 'FETCH_INVITATIONS'});
  }
  render() {
    let content = null;
    if (this.props.user.userName && this.props.messages.length > 0) {
      content = (
        <Paper>
          <ComposeMessage />
          <NewMessages />
          <Invitations />
          <ArchivedMessages />
          <SentMessages />
        </Paper>
        );
    } else if (this.props.user.userName && this.props.messages.length === 0){
      content = (
        <Paper>
          <ComposeMessage />
          <Typography>No new messages.</Typography>
          <Invitations />
          <ArchivedMessages />
          <SentMessages />
           </Paper>
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