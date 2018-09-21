import React, { Component } from 'react';
import { connect } from 'react-redux';
import PetCard from './PetCard/PetCard.js';
import axios from 'axios'; 
import Nav from '../Nav/Nav';
import { USER_ACTIONS } from '../../redux/actions/userActions';
import {Button} from '@material-ui/core'; 

const mapStateToProps = state => ({
  user: state.user,
  household: state.householdBuilder.household,
  pets: state.currentHousehold.currentPets
});

class Dashboard extends Component {
  componentDidMount() {
    this.props.dispatch({type: USER_ACTIONS.FETCH_USER});
    this.madeGetRequest = false;
    
  }
  componentDidUpdate() {
    if (!this.props.user.isLoading && this.props.user.userName === null) {
      this.props.history.push('/home');
    } else if (!this.props.user.isLoading && this.props.user.userName !== null && !this.madeGetRequest) {
      // only make this request one time after the user object has been populated
      this.getPets();
      this.madeGetRequest = true;
    }
  }
  getHouseholdMembers = () => {
    axios({
      method: 'GET', 
      url: `/api/household/members?id=${this.props.user.household_id}`
    }).then((response) => {
      const action = {type: 'SET_HOUSEHOLD_MEMBERS', payload: response.data};
      this.props.dispatch(action); 
      this.getHouseholdName(); 
    }).catch((error) => {
      console.log('Error getting household members', error); 
    })
  }
  getHouseholdName = () => {
    axios({
      method: 'GET', 
      url: '/api/household/nickname'
    }).then((response) => {
      const action = {type: 'SET_CURRENT_HOUSEHOLD_NICKNAME', payload: response.data};
      this.props.dispatch(action); 
    }).catch((error) => {
      console.log('error getting household nickname', error);
    });
  }
  getPets = () => {
    axios({
      method: 'GET', 
      url: `/api/pets?id=${this.props.user.household_id}`
    }).then((response) => {
      const action = {type: 'SET_EXISTING_PETS', payload: response.data};
      this.props.dispatch(action);
      this.getHouseholdMembers();
    }).catch((error) => {
      console.log('Error getting pets', error);
    })
  }
  navigateTo = (link) => {
    this.props.history.push(link); 
  }
  render() {
    let content = null;

    if (this.props.user.userName && this.props.user.household_id !== null) {
      content = (
        <div>
           <div id="welcome">
              <h1>Welcome, { this.props.user.userName }!</h1>
            </div>
            <div className="container">
            {this.props.pets.map((pet, i) => {
              return(
                <PetCard history={this.props.history} key={i} pet={pet}/>
              );
            })}
            </div>
        </div>
      );
    } else if (this.props.user.userName && this.props.user.household_id === null){
      content = (
       <div>
        <h3>You currently are not in a household!</h3>
        <Button color="primary"variant="outlined" onClick={this.navigateTo('/createhousehold')}>Create Household</Button>
        {/* Join household will go to a page where they can search or accept any open invitations */}
        <Button color="primary" variant="outlined" onClick={()=>this.navigateTo('/joinhousehold')}>Join Household</Button>
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
export default connect(mapStateToProps)(Dashboard);
