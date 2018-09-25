import React, { Component } from 'react';
import { connect } from 'react-redux';
import Nav from '../Nav/Nav';
import { USER_ACTIONS } from '../../redux/actions/userActions';
import {Select, MenuItem, Button} from '@material-ui/core'; 
import {Line} from 'react-chartjs-2';
import axios from 'axios'; 

const mapStateToProps = state => ({
  user: state.user,
  nextPage: state.nextPage.nextPage
});

class DataReports extends Component {
  constructor(props){
    super(props);
    this.state = {
    pet_id: '',
    activity_id: '', 
    activityData: [],
  }
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
  getActivityData = () => {
    if(this.state.activity_id === 1){
      axios({
        method: 'GET', 
        url: `/api/activities/feedingdata?pet=${this.state.pet_id}`
      }).then((response) => {
        console.log(response.data);
        this.handleDataFromServer(response.data);
      }).catch((error) => {
        console.log('Error getting activity data', error); 
      });
    } else if (this.state.activity_id === 2){
      
    }
    
  }
  handleChangeFor = (property, event) => {
    this.setState({
      [property]: event.target.value
    });
  }
  // checks to see what type of activity was requested
  // pulls out relevant information from that array 
  // sets the new array to state in order to create a chart 
 
  render() {
    let content = null;

    if (this.props.user.userName && this.props.user.household_id !== null) {
      content = (
        <div>
          {JSON.stringify(this.state.data.datasets)}
          <h3>Pet Activity Data</h3>
          <Select value={this.state.pet_id} onChange={(event)=>this.handleChangeFor('pet_id', event)}> 
            <MenuItem value="12">Dionne</MenuItem>
            <MenuItem value="14">Reed</MenuItem>
          </Select>
          <Select value={this.state.activity_id} onChange={(event)=>this.handleChangeFor('activity_id', event)}>
            <MenuItem value="1">Feeding</MenuItem>
            <MenuItem value="2">Walking</MenuItem>
            <MenuItem value="3">Litterbox</MenuItem>
            <MenuItem value="4">Medications</MenuItem>
          </Select>
            <Button onClick={this.getActivityData}>Submit</Button>
      {/* this will be its own component with conditional rendering*/}
    
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
export default connect(mapStateToProps)(DataReports); 