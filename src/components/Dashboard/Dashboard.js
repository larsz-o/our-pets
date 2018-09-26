import React, { Component } from 'react';
import { connect } from 'react-redux';
import PetCard from './PetCard/PetCard.js';
import axios from 'axios'; 
import Nav from '../Nav/Nav';
import { USER_ACTIONS } from '../../redux/actions/userActions';
import {Button, Typography} from '@material-ui/core'; 

const mapStateToProps = state => ({
  user: state.user,
  household: state.householdBuilder.household,
  pets: state.currentHousehold.currentPets,
  nextPage: state.nextPage.nextPage
});

class Dashboard extends Component {
  constructor(props){
    super(props);
    this.state = {
      message: ''
    }
  }
  componentDidMount() {
    this.props.dispatch({type: USER_ACTIONS.FETCH_USER});
    this.madeGetRequest = false;
    this.getMessages();
  }
  componentDidUpdate() {
    if (!this.props.user.isLoading && this.props.user.userName === null) {
      this.props.dispatch({type: 'NEXT_PAGE', payload: '/inbox'});
      this.props.history.push(this.props.nextPage);
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
  //checks to see if there are new messages for the user and alerts them via text on the DOM if yes  
  getMessages = () => {
    axios({
      method: 'GET',
      url: '/api/inbox?archived=false'
    }).then((response) => {
      if(response.data.length > 0){
        this.setState({
          message: 'You have new inbox messages!'
        });
      }
    }).catch((error) => {
      console.log('Error getting messages', error); 
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
              <Typography variant="body1">{this.state.message}</Typography>
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
