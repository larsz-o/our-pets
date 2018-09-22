import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios'; 
import Nav from '../Nav/Nav';
import { USER_ACTIONS } from '../../redux/actions/userActions';
import {Button, Paper} from '@material-ui/core'; 
import './confirm.css'
import swal from 'sweetalert';

const mapStateToProps = state => ({
  user: state.user,
  household: state.householdBuilder.household,
  member: state.householdBuilder.household.users
});

class ConfirmHousehold extends Component {
//if addPets() is successful, it will call editUsers() to edit the person table, adding the household_id key 
  addPets = () => {
    console.log('in addPets')
    axios({
      method: 'POST', 
      url: '/api/pets',
      data: this.props.household
    }).then((response) => {
      console.log('Success!', response); 
      this.editUser();
    }).catch((error) => {
      console.log('Error adding pets', error); 
    });
  }
  // will send a text message to each added household member, asking them to confirm their invitation
  alertUser = () =>{
    for (let i = 0; i < this.props.member.length; i++){
      if(!this.props.member[i].authorized){
        axios({
          method: 'POST', 
          url: '/api/text/confirm',
          data: {number: this.props.member[i].phone_number, message: `${this.props.user.first_name} has invited you to join their household on Did You Feed Them? Check your inbox [url] to accept!`}
        }).then((response) => {
          this.sendInvitation(this.props.member[i]); 
        }).catch((error) => {
          console.log('Error sending invitation', error); 
        });
      }
    }
  }
  componentDidMount() {
    this.props.dispatch({type: USER_ACTIONS.FETCH_USER});
  }
  componentDidUpdate() {
    if (!this.props.user.isLoading && this.props.user.userName === null) {
      this.props.history.push('home');
    }
  }
  //editUser makes a put request to existing users, adding the household_id to their database entry. 
  //this concludes the createHousehold functionality, so an alert is generated upon success
  //then, users are pushed to their dashboard
editUser = () => {
  console.log('in edit users');
  axios({
    method: 'PUT', 
    url: 'api/user/household', 
    data: this.props.household
  }).then((response) => {
    swal(`'Nice!', '${this.props.household.nickname} Household created!', 'success'`);
    this.alertUser();
  }).catch((error) => {
    console.log('Error updating user information', error); 
  })
}
sendInvitation = (member) => {
  axios({
    method: 'POST', 
    url: '/api/inbox',
    data: {sender: this.props.user.id, receiver: member.id, message: `${this.props.user.first_name} has invited you to join their household. Do you accept their invitation?`}
  }).then((response)=> {
    this.props.history.push('/dashboard'); 
  }).catch((error)=> {
    console.log('Error sending invitation to inbox', error); 
  });
  
}
  render() {
    let content = null;
    if (this.props.user.userName) {
      content = (
        <div className="confirmDiv">
          <Paper>
            <h2>Does this look right?</h2>
            <p>Household Nickname:</p>
            <ul>
              <li>{this.props.household.nickname}</li>
            </ul>
            <p>Pets:</p> 
            <ul>
            {this.props.household.pets.map((pet, i)=> {
                return(
                    <li key={i}>{pet.pet_name}</li>
                );
            })}
            </ul>
            <p>Household Members:</p>
            <ul> 
            {this.props.household.users.map((user, i)=> {
                return(
                    <li key={i}>{user.username}</li>
                );
            })} 
            </ul> 

            <Button onClick={this.addPets}>Confirm</Button>
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
export default connect(mapStateToProps)(ConfirmHousehold); 