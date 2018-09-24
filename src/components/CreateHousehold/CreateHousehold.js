import React, { Component } from 'react';
import { connect } from 'react-redux';
import swal from 'sweetalert';
import Nav from '../Nav/Nav';
import { USER_ACTIONS } from '../../redux/actions/userActions';
import {Button, Input, ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails} from '@material-ui/core'; 
import axios from 'axios';

const mapStateToProps = state => ({
  user: state.user,
  household: state.householdBuilder.household.authorized,
  nextPage: state.nextPage.nextPage
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
  //createHouseholdRecord adds the household to the database, then calls the function getHouseholdID to pull the database ID that was just created
  //the household_id is needed to register pets and users in the next steps of the form. 
  createHouseholdRecord = () => {
    axios({
      method: 'POST', 
      url: '/api/household/createhousehold', 
      data: this.state
    }).then((response) => {
      console.log('Success!', response.data);
      this.getHouseholdID();
    }).catch((error) => {
      console.log('Error posting household', error);
      swal('Oh no', 'Something went wrong posting the household. Try a different nickname.', 'warning'); 
    })
  }
  componentDidMount() {
    this.props.dispatch({type: USER_ACTIONS.FETCH_USER});
  }
  componentDidUpdate() {
    if (!this.props.user.isLoading && this.props.user.userName === null) {
      this.props.dispatch({type: 'NEXT_PAGE', payload: '/inbox'});
      this.props.history.push(this.props.nextPage);
    }
  }
  //getHouseholdID gets the household_id that was just created and calls sendUsersToRedux, adding the currently signed in user's information to the createhousehold reducer
  getHouseholdID = () => {
    console.log('in getHouseholdId');
    axios({
      method: 'GET', 
      url: `api/household?nickname=${this.props.household.nickname}`
    }).then((response) => {
      console.log(response.data[0].id); 
      const action = {type: 'SET_HOUSE_ID', payload: response.data[0].id}; 
      this.props.dispatch(action); 
      this.sendUserToRedux();
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
  //sendNickNameToRedux dispatches the household nickname entered so that it can be used as the rest of the household information is collected.
  // it then creates the household in the database because the nickname has to be unique
  // if the nickname is not unique, the rest of the registration will fail 
  sendNickNameToRedux = (event) => {
    event.preventDefault(); 
    const action = {type: 'SET_NICKNAME', payload: this.state.nickname};
    this.props.dispatch(action); 
    this.createHouseholdRecord();
  }
  sendUserToRedux = () => {
    const action = {type: 'SET_NEW_USERS', payload: {person_id: this.props.user.id, username: this.props.user.userName, authorized: true, role: 1}};
    this.props.dispatch(action);
    this.props.history.push('/addpets'); 
    
  }
  render() {
    let content = null;

    if (this.props.user.userName) {
      content = (
        <div>
          <ExpansionPanel>
            <ExpansionPanelSummary><h2>Create Household</h2></ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <label>Household Nickname:</label>
              <Input type="text" value={this.state.nickname} onChange={this.handleInputChangeFor('nickname')} placeholder="e.g. The Yellow House" required/><br/>
              <Button variant="outlined" color="primary" onClick={this.sendNickNameToRedux}>Submit</Button>
            </ExpansionPanelDetails>
          </ExpansionPanel>
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