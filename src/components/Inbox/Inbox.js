import React, { Component } from 'react';
import { connect } from 'react-redux';
import Nav from '../Nav/Nav';
import '../Inbox/inbox.css';
import ComposeMessage from '../ComposeMessage/ComposeMessage';
import ArchivedMessages from '../ArchivedMessages/ArchivedMessages'
import NewMessages from '../NewMessages/NewMessages'; 
import SentMessages from '../SentMessages/SentMessages';
import Invitations from '../Invitations/Invitations';
import axios from 'axios';
import { USER_ACTIONS } from '../../redux/actions/userActions';
import {Paper} from '@material-ui/core';

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
    this.getAllHouseholdMembers();
    this.getInvitations();
}
  componentDidUpdate() {
    if (!this.props.user.isLoading && this.props.user.userName === null) {
      this.props.history.push('/home');
    }
  }
  getAllHouseholdMembers = () => {
    axios({
      method: 'GET', 
      url: '/api/household/members/all'
  }).then((response) => {
    console.log(response.data);
    const action = {type: 'SET_ALL_HOUSEHOLD_MEMBERS', payload: response.data};
    this.props.dispatch(action);
  }).catch((error) => {
      console.log('Error getting all household members', error);
  });
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
          <ComposeMessage householdMembers={this.state.household_members}/>
          <NewMessages />
          <Invitations />
          <ArchivedMessages />
          <SentMessages />
        </Paper>
        );
    } else if (this.props.user.userName && this.props.messages.length === 0){
      content = (
        <Paper>
          <ComposeMessage householdMembers={this.state.household_members}/>
          <p>No new messages.</p>
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