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
    this.madeGetRequest = false;
  }
  componentDidUpdate() {
    if (!this.props.user.isLoading && this.props.user.userName === null) {
      this.props.dispatch({type: 'NEXT_PAGE', payload: '/inbox'});
      this.props.history.push(this.props.nextPage);
    } else if (!this.props.user.isLoading && this.props.user.userName !== null && !this.madeGetRequest) {
      // only make this request one time after the user object has been populated
      this.getUserHouseholds();
      this.madeGetRequest = true;
    }
  }
  getUserHouseholds = () => {
    axios({
        method: 'GET', 
        url: '/api/household/all'
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
  navigateTo = (link) => {
    this.props.history.push(link); 
  }
  selectHousehold = () => {
      axios({
          method: 'PUT', 
          url: '/api/user/selecthousehold',
          data: {household_id: this.state.chosen_household}
      }).then((response) => {
        const action = {type: 'SET_CURRENT_HOUSEHOLD_NICKNAME', payload: response.data};
        this.props.dispatch(action); 
        this.props.history.push('/dashboard');
      }).catch((error) => {
          console.log('Error selecting household', error);
      })
  }
  render() {
    let content = null;

    if (this.props.user.userName && this.props.totalHouses.length > 1) {
      content = (
        <div>
           <div id="welcome">
              <h1>Welcome, { this.props.user.userName }!</h1>
              <Typography>Which household would you like to use?</Typography>
              <Select value={this.state.chosen_household} onChange={(event)=>this.handleChangeFor('chosen_household', event)}>
                  {this.props.totalHouses.map((house, i) => {
                      return(
                    <MenuItem value={house.household_id} key={i}>{house.nickname}</MenuItem>
                      );
                  })}
              </Select>
              <Button onClick={this.selectHousehold}>Select Household</Button>
            </div>
        </div>
      );
    } else if (this.props.user.userName && this.props.totalHouses.length < 1){
        content = (
         <div>
          <h3>You currently are not in a household!</h3>
          <Button color="primary"variant="outlined" onClick={()=>this.navigateTo('/createhousehold')}>Create Household</Button>
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
export default connect(mapStateToProps)(SelectHousehold);
