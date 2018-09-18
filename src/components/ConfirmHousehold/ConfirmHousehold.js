import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios'; 
import Nav from '../Nav/Nav';
import { USER_ACTIONS } from '../../redux/actions/userActions';

const mapStateToProps = state => ({
  user: state.user,
  household: state.household.household
});

class ConfirmHousehold extends Component {
  constructor(props) {
    super(props);
  }
//if addPets() is successful, it will call editUsers() to edit the person table, adding the household_id key 
  addPets = () => {
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
  axios({
      method: 'POST', 
      url: '/api/household/createhousehold', 
      data: this.props.household
  }).then((response) => {
      console.log(response); 
      this.getHouseholdID();
  }).catch((error) => {
      console.log('Error submitting household', error); 
  })
}
editUser = () => {
  axios({
    method: 'PUT', 
    url: 'api/user', 
    data: this.props.household
  }).then((response) => {
    console.log(response); 
  }).catch((error) => {
    console.log('Error updating user information', error); 
  })
}
getHouseholdID = () => {
  axios({
    method: 'GET', 
    url: `api/household/house?houseid=${this.props.household.nickname}`
  }).then((response) => {
    console.log(response.data.id); 
    const action = {type: 'SET_HOUSE_ID', payload: response.data.id}; 
    this.props.dispatch(action); 
    this.addPets();
  }).catch((error) => {
    console.log('Error getting household ID', error); 
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
            {JSON.stringify(this.props.household)}

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

            <button onClick={this.createHousehold}>Confirm</button>
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