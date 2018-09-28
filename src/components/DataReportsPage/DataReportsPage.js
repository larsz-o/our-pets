import React, { Component } from 'react';
import { connect } from 'react-redux';
import Nav from '../Nav/Nav';
import { USER_ACTIONS } from '../../redux/actions/userActions';
import {Select, MenuItem, Button, Typography, InputLabel} from '@material-ui/core'; 
import ReportingComponent from '../ReportingTableComponent/ReportingTableComponent';
import axios from 'axios'; 

const mapStateToProps = state => ({
  user: state.user,
  nextPage: state.nextPage.nextPage, 
  pets: state.currentHousehold.currentPets
});
class DataReports extends Component {
  constructor(props){
    super(props);
    this.state = {
    pet_id: '',
    activity_id: '', 
    activityData: [],
    query_limit: 5
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
    if(this.state.activity_id === '1' || this.state.activity_id === '3'){
      axios({
        method: 'GET', 
        url: `/api/activities/data?pet=${this.state.pet_id}&activity=${this.state.activity_id}&limit=${this.state.query_limit}`
      }).then((response) => {
        console.log(response.data);
        this.setState({
          ...this.state, 
          activityData: response.data
        });
      }).catch((error) => {
        console.log('Error getting activity data', error); 
      });
    } else if (this.state.activity_id === '2' || this.state.activity_id === '4'){
      axios({
        method: 'GET', 
        url: `/api/activities/expandeddata?pet=${this.state.pet_id}&activity=${this.state.activity_id}&limit=${this.state.query_limit}`
      }).then((response) => {
        console.log(response.data);
        this.setState({
          ...this.state, 
          activityData: response.data
        })
      }).catch((error) => {
        console.log('Error getting activity data', error); 
      });
    }
  }

  render() {
    let content = null;

    if (this.props.user.userName && this.props.user.household_id !== null) {
      content = (
        <div>
          <div className="heading-container">
          <Typography variant="display1">Pet Activity Data</Typography>
          <Typography>Search for pet activity history</Typography>
          </div>
          <InputLabel>Pet </InputLabel>
          <Select value={this.state.pet_id} onChange={(event)=>this.handleChangeFor('pet_id', event)}> 
          {this.props.pets.map((pet, i)=> {
            return(
              <MenuItem key={i} value={pet.id}>{pet.name}</MenuItem>
            );
          })}
          </Select>
        
          <ReportingComponent pet={this.state.pet_id} activityID={this.state.activity_id} activityData={this.state.activityData}/>
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