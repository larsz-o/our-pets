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

const mapStateToProps = state => ({
  user: state.user,
  totalHouseholds: state.allHouseholds.totalUserHouseholds
});
class Inbox extends Component {
  constructor(props){
    super(props);
    this.state = {
      messages: [],
      household_members: [], 
      sentMessages: [],
      archivedMessages: [], 
      invitations: []
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
      for(let i = 0; i < this.props.totalHouseholds.length; i++){
          let household_id = this.props.totalHouseholds[i].household_id; 
          console.log('in get all household members', household_id);
          axios({
            method: 'GET', 
            url: `/api/household/members/all?id=${household_id}`
        }).then((response) => {
          console.log(response.data);
          this.setState({
            household_members: [...this.state.household_members, ...response.data]
          });
        }).catch((error) => {
            console.log('Error getting all household members', error);
        });
      } 
  }
  //gets sent messages
getSentMessages = () => {
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
//get archived messages
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
  //gets current messages when component mounts 
  getMessages = () => {
    axios({
      method: 'GET',
      url: '/api/inbox?archived=false&invitation=false'
    }).then((response) => {
      this.setState({
        messages: response.data
      });
      this.getInvitations();
    }).catch((error) => {
      console.log('Error getting messages', error); 
    });
  }
  //gets current messages when component mounts 
  getInvitations = () => {
    axios({
      method: 'GET',
      url: '/api/inbox?archived=false&invitation=true'
    }).then((response) => {
      this.setState({
        invitations: response.data
      });
    }).catch((error) => {
      console.log('Error getting messages', error); 
    });
  }
  render() {
    let content = null;
    if (this.props.user.userName && this.state.messages.length > 0) {
      content = (
        <div>
          <ComposeMessage householdMembers={this.state.household_members}/>
          <NewMessages messages={this.state.messages}/>
          <Invitations invitations={this.state.invitations}/>
          <ArchivedMessages archivedMessages={this.state.archivedMessages}/>
          <SentMessages sentMessages={this.state.sentMessages}/>
        </div>
        );
    } else if (this.props.user.userName && this.state.messages.length === 0){
      content = (
        <div>
          <ComposeMessage householdMembers={this.state.household_members}/>
          <p>No new messages.</p>
          <Invitations invitations={this.state.invitations}/>
          <ArchivedMessages archivedMessages={this.state.archivedMessages}/>
          <SentMessages sentMessages={this.state.sentMessages}/>
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