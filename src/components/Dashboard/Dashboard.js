import React, { Component } from 'react';
import { connect } from 'react-redux';
import PetCard from './PetCard/PetCard.js';
import axios from 'axios'; 
import Nav from '../Nav/Nav';
import { USER_ACTIONS } from '../../redux/actions/userActions';
import {Button} from '@material-ui/core'; 

const mapStateToProps = state => ({
  user: state.user,
  household: state.household.household,
  pets: state.pets.currentPets
});

class Dashboard extends Component {
  componentDidMount() {
    this.props.dispatch({type: USER_ACTIONS.FETCH_USER});
    // i think this might have to go into a saga so that i can dispatch it, call getPets() in the order that will catch the user's household_id
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
  getPets = () => {
    axios({
      method: 'GET', 
      url: `/api/pets?id=${this.props.user.household_id}`
    }).then((response) => {
      const action = {type: 'SET_EXISTING_PETS', payload: response.data};
      this.props.dispatch(action);
    }).catch((error) => {
      console.log('Error getting pets', error);
    })
  }
  navigateTo = () => {
    this.props.history.push('/createhousehold'); 
  }
  render() {
    let content = null;

    if (this.props.user.userName) {
      content = (
        <div>
          {JSON.stringify(this.props.pets)}
           <div id="welcome">
              <h1>Welcome, { this.props.user.userName }!</h1>
              {/* do logic to figure this out */}
              <h3>You currently [are/are not] in a household!</h3>
              <Button color="primary"variant="outlined" onClick={this.navigateTo}>Create Household</Button>
              <Button color="primary" variant="outlined">Join Household</Button>
              <Button color="primary" variant="outlined" onClick={this.getPets}>Get Pets</Button>
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
