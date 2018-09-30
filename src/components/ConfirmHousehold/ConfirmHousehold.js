import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios'; 
import Nav from '../Nav/Nav';
import { USER_ACTIONS } from '../../redux/actions/userActions';
import {Button, Paper, Typography, List, ListItem} from '@material-ui/core'; 
import swal from 'sweetalert';

const mapStateToProps = state => ({
  user: state.user,
  household: state.householdBuilder.household,
  nextPage: state.nextPage.nextPage
});

class ConfirmHousehold extends Component {
//if addPets() is successful, it will call editUsers() to edit the person table, adding the household_id key 
  addPets = () => {
    console.log('in adding pets');
    for (let i = 0; i < this.props.household.pets.length; i++) {
      let newPet = {name: this.props.household.pets[i].pet_name, species_id: this.props.household.pets[i].species_id, birthday: this.props.household.pets[i].birthday, image_path: this.props.household.pets[i].image_path, household_id: this.props.household.household_id}
      console.log(newPet); 
      axios({
      method: 'POST', 
      url: '/api/pets',
      data: newPet
    }).then((response) => {
      console.log('Success!', response); 
      this.addMembersToHousehold();
    }).catch((error) => {
      console.log('Error adding pets', error); 
    });
  }}
  componentDidMount() {
    this.props.dispatch({type: USER_ACTIONS.FETCH_USER});
  }
  componentDidUpdate() {
    if (!this.props.user.isLoading && this.props.user.userName === null) {
      this.props.dispatch({type: 'NEXT_PAGE', payload: '/inbox'});
          this.props.history.push(this.props.nextPage);
    }
  }
addMembersToHousehold = () => {
  console.log('adding members to household');
  for (let i = 0; i < this.props.household.users.length; i++){
    let newUser = {household_id: this.props.household.household_id, authorized: this.props.household.users[i].authorized, person_id: this.props.household.users[i].person_id, role: this.props.household.users[i].role}; 
    console.log(newUser);
    axios({
    method: 'POST', 
    url: 'api/household/addmembers', 
    data: newUser
  }).then((response) => {
    swal(`${this.props.household.nickname} Household created!`);
    this.sendInvitation();
  }).catch((error) => {
    console.log('Error updating user information', error); 
  });
}}
navTo = () => {
  this.props.history.push('/selecthousehold');
}
sendInvitation = () => {
  console.log('in send invitation');
  let date = new Date();
  for (let i = 0; i < this.props.household.users.length; i++){
    if(this.props.household.users[i].id !== this.props.user.id){
      let member = this.props.household.users[i];
      console.log(member);
  axios({
    method: 'POST', 
    url: '/api/inbox',
    data: {sender: this.props.user.id, date: date, receiver: member.person_id, subject: 'Will you join my household?', message: `Hi ${member.username}! I'd like you to join my household so that we can coordinate pet care. Do you accept?`, invitation: true, household_id: this.props.household.household_id}
  }).then((response)=> {
    swal(`Invitation sent to ${member.username}!`);
    this.navTo();
  }).catch((error)=> {
    console.log('Error sending invitation to inbox', error); 
  });
  }
}}
render() {
    let content = null;
    if (this.props.user.userName) {
      content = (
        <div className="container">
          <Paper>
            <Typography variant="headline">Does this look right?</Typography>
          <div className="add-container">
            <Typography>Household Nickname:</Typography>
            <List>
              <ListItem>{this.props.household.nickname}</ListItem>
            </List>
            <Typography>Pets:</Typography> 
            <List>
            {this.props.household.pets.map((pet, i)=> {
                return(
                    <ListItem key={i}>{pet.pet_name}</ListItem>
                );
            })}
            </List>
            <Typography>Household Members:</Typography>
            <List> 
            {this.props.household.users.map((user, i)=> {
                return(
                    <ListItem key={i}>{user.first_name}</ListItem>
                );
            })} 
            </List>
          </div>
            <Button onClick={()=>this.props.history.push('/addusers')}>Back</Button>
            <Button color="primary" onClick={this.addPets}>Confirm</Button>
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