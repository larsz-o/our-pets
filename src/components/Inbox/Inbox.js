import React, { Component } from 'react';
import { connect } from 'react-redux';
import Nav from '../Nav/Nav';
import '../Inbox/inbox.css';
import ComposeMessage from '../ComposeMessage/ComposeMessage';
import ArchivedMessages from '../ArchivedMessages/ArchivedMessages'
import NewMessages from '../NewMessages/NewMessages'; 
import SentMessages from '../SentMessages/SentMessages';
import axios from 'axios';
import { USER_ACTIONS } from '../../redux/actions/userActions';

const mapStateToProps = state => ({
  user: state.user,
});
class Inbox extends Component {
  constructor(props){
    super(props);
    this.state = {
      messages: [],
      household_members: [],
      household_id: []
    }
  }
  componentDidMount() {
    this.props.dispatch({type: USER_ACTIONS.FETCH_USER});
    this.getMessages();
}
  componentDidUpdate() {
    if (!this.props.user.isLoading && this.props.user.userName === null) {
      this.props.history.push('/home');
    }
  }
  //gets the householdIDs to then run a query to get all household members by that ID
  getAllHouseholdIDs = () => {
    console.log('get all householdIDs')
    axios({
        method: 'GET', 
        url: '/api/household/all'
    }).then((response) => {
      console.log(response.data);
      this.getAllHouseholdMembers(response.data);
    }).catch((error) => {
        console.log('Error getting all household members', error);
    });
  }
  getAllHouseholdMembers = (responseArray) => {
      for(let i = 0; i < responseArray.length; i++){
          let household_id = responseArray[i].household_id; 
          console.log('in get all household members', household_id);
          axios({
            method: 'GET', 
            url: `/api/household/members/all?id=${household_id}`
        }).then((response) => {
          console.log(response.data);
          const action = {type: 'SET_ALL_HOUSEHOLD_MEMBERS', payload: response.data};
          this.props.dispatch(action);
        }).catch((error) => {
            console.log('Error getting all household members', error);
        });
      } 
  }
  //gets current messages when component mounts 
  getMessages = () => {
    axios({
      method: 'GET',
      url: '/api/inbox?archived=false'
    }).then((response) => {
      this.setState({
        messages: response.data
      });
      this.getAllHouseholdIDs();
    }).catch((error) => {
      console.log('Error getting messages', error); 
    });
  }
  
  render() {
    let content = null;
    if (this.props.user.userName && this.state.messages.length > 0) {
      content = (
        <div>
          {JSON.stringify(this.state)}
          <ComposeMessage householdMembers={this.state.household_members}/>
          <NewMessages messages={this.state.messages}/>
          <ArchivedMessages/>
          <SentMessages/>
        </div>
        );
    } else if (this.props.user.userName && this.state.messages.length === 0){
      content = (
        <div>
          <ComposeMessage/>
          <p>No new messages.</p>
          <ArchivedMessages/>
          <SentMessages/>
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