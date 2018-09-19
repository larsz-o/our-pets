import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios'; 
import Nav from '../Nav/Nav';
import { USER_ACTIONS } from '../../redux/actions/userActions';
import {Button} from '@material-ui/core'; 

const mapStateToProps = state => ({
  user: state.user,
  household: state.household.household
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
  componentDidMount() {
    this.props.dispatch({type: USER_ACTIONS.FETCH_USER});
  }

  componentDidUpdate() {
    if (!this.props.user.isLoading && this.props.user.userName === null) {
      this.props.history.push('home');
    }
  }
  // createHousehold will first populate the households table. 
  // if successful, it will get the household_id and then call addPets to pets table, using the household_id key
createHousehold = () => {
  console.log('in createHousehold');
  axios({
      method: 'POST', 
      url: '/api/household/createhousehold', 
      data: this.props.household
  }).then((response) => {
      console.log(response); 
      // this.getHouseholdID();
  }).catch((error) => {
      console.log('Error submitting household', error); 
  })
}
editUser = () => {
  console.log('in edit users');
  axios({
    method: 'PUT', 
    url: 'api/user/household', 
    data: this.props.household
  }).then((response) => {
    console.log(response); 
  }).catch((error) => {
    console.log('Error updating user information', error); 
  })
}

navigateToNextPage = () => {
      this.props.history.push('/dashboard'); 
  }

  render() {
    let content = null;
    if (this.props.user.userName) {
      content = (
        <div>
            <h2>Confirm Household</h2>
            <p>Nickname: {this.props.household.nickname}</p>
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

            <Button onClick={this.createHousehold}>Confirm</Button>
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