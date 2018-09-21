import React, { Component } from 'react';
import { connect } from 'react-redux';
import './AcceptRequest.css'; 
import Nav from '../Nav/Nav';
import { USER_ACTIONS } from '../../redux/actions/userActions';
import { Button } from '@material-ui/core';
import axios from 'axios';


const mapStateToProps = state => ({
  user: state.user,

});

class AcceptRequest extends Component {
   
  acceptInvitation = () => {
     axios({
         method: 'PUT', 
         url: '/api/household/accept',
         data: {authorized: true, household_id: this.props.user.household_id}
     }).then((response) => {
         console.log(response.data);
         //navigate to dashboard? 
     }).catch((error) => {
         console.log('Error changing authorization', error); 
     });
  }
  declineInvitation = () => {
      alert('Invitation declined!'); 
      this.props.history.push('/dashboard'); 
  }
  componentDidMount() {
    this.props.dispatch({type: USER_ACTIONS.FETCH_USER});
  }
  componentDidUpdate() {
    if (!this.props.user.isLoading && this.props.user.userName === null) {
      this.props.history.push('home');
    }
  }
  render() {
    let content = null;
//conditional rendering -- use the same put route
//if person is accepting an invitation or accepting someone added to their house
    if (this.props.user.userName) {
      content = (
        <div>
            <div className="card">
            <h3>[user] has invited you to join the [] household!</h3>
            <Button onClick={this.acceptInvitation}>Accept</Button><Button onClick={this.declineInvitation}>Decline</Button>
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
export default connect(mapStateToProps)(AcceptRequest); 