import React, { Component } from 'react';
import { connect } from 'react-redux';
import Nav from '../Nav/Nav';
import { USER_ACTIONS } from '../../redux/actions/userActions';
import {Button} from '@material-ui/core';
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
    axios({
      method: 'PUT', 
      url: '/api/household/accept',
      data: {authorized: true, household_id: this.props.user.household_id}
    }).then((response) => {
      console.log(response.data);
      swal('Nice!', 'Invitation accepted!', 'success');
      this.props.history.push('/dashboard');
    }).catch((error) => {
      console.log('Error changing authorization', error); 
    });
  }
  declineInvitation = () => {
    swal({
      title: 'Are you sure?',
      icon: 'warning', 
      buttons: true,
      dangerMode: true
  }).then((willDelete) => {
    if (willDelete){
      swal('Invitation declined!', {
        icon: 'success',
      });
    } else {
      swal('You can keep thinking about this one.');
    }
  });
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
                  <div key={i} className="inbox-card">
                    <h3 className="headline">Message from {message.sender}</h3>
                    {message.message}
                    <br/><br/>
                  <Button variant="contained" color="primary" size="small" onClick={this.acceptInvitation}>Accept</Button>  <Button size="small" variant="contained" onClick={this.declineInvitation}>Decline</Button>
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