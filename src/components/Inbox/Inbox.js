import React, { Component } from 'react';
import { connect } from 'react-redux';
import Nav from '../Nav/Nav';
import { USER_ACTIONS } from '../../redux/actions/userActions';
import {Button, ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails} from '@material-ui/core';
import './inbox.css';
import axios from 'axios';
import swal from 'sweetalert'; 

const mapStateToProps = state => ({
  user: state.user,
  pets: state.currentHousehold.currentPets,
  members: state.currentHousehold.currentHouseholdMembers
});

class EditSettings extends Component {
  constructor(props){
    super(props);
    this.state = {
      messages: []
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
  acceptInvitation = () => {
    console.log('accepted!');
  }
  declineInvitation = () => {
    console.log('declined!');
  }
  getMessages = () => {
    axios({
      method: 'GET',
      url: '/api/inbox'
    }).then((response) => {
      this.setState({
        messages: response.data
      });
    }).catch((error) => {
      console.log('Error getting messages', error); 
    });
  }
  render() {
    let content = null;
    if (this.props.user.userName) {
      content = (
        <div>
           <div> 
              {this.state.messages.map((message, i) => {
                return (
                  <div>
                    <h3>Message from {message.sender}</h3>
                    {message.message}
                    <br/>
                  <Button variant="contained" color="primary" onClick={this.acceptInvitation}>Accept</Button><Button variant="contained" color="secondary" onClick={this.declineInvitation}>Decline</Button>
                  </div>
                );
              })}
           </div>
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
export default connect(mapStateToProps)(EditSettings); 