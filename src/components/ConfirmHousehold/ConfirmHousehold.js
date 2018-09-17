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

  componentDidMount() {
    this.props.dispatch({type: USER_ACTIONS.FETCH_USER});
  }

  componentDidUpdate() {
    if (!this.props.user.isLoading && this.props.user.userName === null) {
      this.props.history.push('home');
    }
  }
  
  navigateToNextPage = () => {
      this.props.history.push('/addusers'); 
  }
  // createHousehold will first populate the households table. 
  // if successful, it will get the household_id and then call addPets to pets table, using the household_id key
  // finally, it will call addUsers to edit the person table, adding the household_id key 
createHousehold = () => {
    axios({
        method: 'POST', 
        url: '/api/household/createhousehold', 
        data: this.props.household
    }).then((response) => {
        console.log(response); 
    }).catch((error) => {
        console.log('Error submitting household', error); 
    })
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
                    <li key={i}>{pet.name}, {pet.species}</li>
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