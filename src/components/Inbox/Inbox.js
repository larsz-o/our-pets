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
  // axios({
  //   method: 'GET',
  //   url: '/api/inbox/sent'
  // }).then((response) => {
  // const action = {type: 'SET_SENT_MESSAGES', payload: response.data};
  // this.props.dispatch(action); 
  // }).catch((error) => {
  //   console.log('Error getting sent messages', error); 
  // });
}
//get archived messages
getArchivedMessages = () => {
  this.props.dispatch({type: 'FETCH_ARCHIVED_MESSAGES'});
  // axios({
  //   method: 'GET',
  //   url: '/api/inbox?archived=true'
  // }).then((response) => {
  //   const action = {type: 'SET_ARCHIVED_MESSAGES', payload: response.data};
  //   this.props.dispatch(action);
  // }).catch((error) => {
  //   console.log('Error getting messages', error); 
  // });
}
  //gets current messages when component mounts 
  getMessages = () => {
    this.props.dispatch({type: 'FETCH_NEW_MESSAGES'});
    // axios({
    //   method: 'GET',
    //   url: '/api/inbox?archived=false&invitation=false'
    // }).then((response) => {
    //   const action = {type: 'SET_NEW_MESSAGES', payload: response.data};
    //   this.props.dispatch(action);
    //   this.getInvitations();
    // }).catch((error) => {
    //   console.log('Error getting messages', error); 
    // });
  }
  //gets current messages when component mounts 
  getInvitations = () => {
    this.props.dispatch({type: 'FETCH_INVITATIONS'});
    // axios({
    //   method: 'GET',
    //   url: '/api/inbox?archived=false&invitation=true'
    // }).then((response) => {
    //   const action = {type: 'SET_INVITATIONS', payload: response.data};
    //   this.props.dispatch(action);
    // }).catch((error) => {
    //   console.log('Error getting messages', error); 
    // });
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