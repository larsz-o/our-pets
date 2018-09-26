import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios'; 
import Nav from '../Nav/Nav';
import { USER_ACTIONS } from '../../redux/actions/userActions';
import {Button, Select, MenuItem, Typography} from '@material-ui/core'; 


const mapStateToProps = state => ({
  user: state.user,
  totalHouses: state.allHouseholds.totalUserHouseholds,
  nextPage: state.nextPage.nextPage
});

class SelectHousehold extends Component {
  constructor(props){
    super(props);
    this.state = {
        chosen_household: ''
    }
  }
  componentDidMount() {
    this.props.dispatch({type: USER_ACTIONS.FETCH_USER});
    this.getUserHouseholds();
  }
  componentDidUpdate() {
    if (!this.props.user.isLoading && this.props.user.userName === null) {
      this.props.dispatch({type: 'NEXT_PAGE', payload: '/inbox'});
      this.props.history.push(this.props.nextPage);
    }
  }
  getUserHouseholds = () => {
      axios({
          method: 'GET', 
          url: '/api/houshold/all'
      }).then((response) => {
        const action = {type: 'SET_ALL_USER_HOUSEHOLDS', payload: response.data};
        this.props.dispatch(action);
      }).catch((error) => {
          console.log('Error getting user households', error);
      });
  }
  handleChangeFor = (property, event) => {
    this.setState({
      [property]: event.target.value
    });
  }
  render() {
    let content = null;

    if (this.props.user.userName && this.props.user.household_id !== null) {
      content = (
        <div>
           <div id="welcome">
              <h1>Welcome, { this.props.user.userName }!</h1>
              <Typography>Which household would you like to use?</Typography>
              <Select value={this.state.chosen_household} onChange={(event)=>this.handleChangeFor('chosen_household', event)}>
                  {this.props.totalHouses.map((house, i) => {
                      <MenuItem value={house.id} key={i}>{house.nickname}</MenuItem>
                  })}
              </Select>
              <Button onClick={this.selectHousehold}>Select Household</Button>
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
