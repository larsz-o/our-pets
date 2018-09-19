import React, { Component } from 'react';
import { connect } from 'react-redux';

import Nav from '../Nav/Nav';
import { USER_ACTIONS } from '../../redux/actions/userActions';
import {Button} from '@material-ui/core'; 
import axios from 'axios';

const mapStateToProps = state => ({
  user: state.user,
});

class CreateHousehold extends Component {
  constructor(props) {
    super(props);

    this.state = {
        nickname: '',
        person_id: '',
        authorized: true
    };
  }
  createHouseholdRecord = () => {
    axios({
      method: 'POST', 
      url: '/api/household/createhousehold', 
      data: this.state
    }).then((response) => {
      console.log('Success!', response.data);
      this.sendHouseholdToRedux();
    }).catch((error) => {
      console.log('Error posting household', error);
      alert('Something went wrong posting the household. Try a different nickname.'); 
    })
  }
  componentDidMount() {
    this.props.dispatch({type: USER_ACTIONS.FETCH_USER});
  }

  componentDidUpdate() {
    if (!this.props.user.isLoading && this.props.user.userName === null) {
      this.props.history.push('home');
    }
  }
  getHouseholdID = () => {
    console.log('in getHouseholdId');
    axios({
      method: 'GET', 
      url: `api/household/house?houseid=${this.props.household.nickname}`
    }).then((response) => {
      console.log(response.data[0].id); 
      const action = {type: 'SET_HOUSE_ID', payload: response.data[0].id}; 
      this.props.dispatch(action); 
      this.addPets();
    }).catch((error) => {
      console.log('Error getting household ID', error); 
    })
  }
  handleInputChangeFor = propertyName => (event) => {
    this.setState({
      [propertyName]: event.target.value,
      person_id: this.props.user.id
    });
  }
  //sendNickNameToRedux dispatches the household nickname entered so that it can be used as the rest of the household information 
  //is collected.
  // once this form is completed, users are sent to the next page to enter information about their pets. 
  sendNickNameToRedux = (event) => {
    event.preventDefault(); 
    const action = {type: 'SET_NICKNAME', payload: this.state.nickname};
    this.props.dispatch(action); 
    this.createHouseholdRecord();
  }
  sendHouseholdToRedux = () => {
    const action = {type: 'SET_USERS', payload: {person_id: this.props.user.id, username: this.props.user.userName, authorized: true, role: 1}};
    this.props.dispatch(action);
    this.props.history.push('/addpets'); 
    this.getHouseholdID();
  }
  render() {
    let content = null;

    if (this.props.user.userName) {
      content = (
        <div>
          <h2>Create Household</h2>
         <form onSubmit={this.sendNickNameToRedux}>
         <div>
           <label>
             Household Nickname: 
           </label>
              <input type="text" value={this.state.nickname} onChange={this.handleInputChangeFor('nickname')} placeholder="e.g. The Yellow House" required/>
           </div>
         <Button type="submit">Submit</Button>
         </form>
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
export default connect(mapStateToProps)(CreateHousehold); 