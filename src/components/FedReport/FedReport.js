import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Button, InputLabel, TextField} from '@material-ui/core'; 
import Nav from '../Nav/Nav';
import { USER_ACTIONS } from '../../redux/actions/userActions';
import { Link } from 'react-router-dom';
import axios from 'axios'; 

const mapStateToProps = state => ({
  user: state.user,
});
let today = new Date(); 
let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
let time = Date.now(); 
class FedReport extends Component {
  constructor(){
    super();
    this.state = {
      date: '01-01-2018',
      time: '12:00 PM',
      notes: '', 
      pet_id: 2, // this will come via props
      person_id: 0,
      activity_id: 1,
      time_start: null,
      time_end: null,
      poop_check: null,
      medication_name: ''
    }
  }
  componentDidMount() {
    this.props.dispatch({type: USER_ACTIONS.FETCH_USER});
  }
  componentDidUpdate() {
    if (!this.props.user.isLoading && this.props.user.userName === null) {
      this.props.history.push('home');
    }
  }
  handleInputChangeFor = propertyName => (event) => {
    this.setState({
      [propertyName]: event.target.value,
      person_id: this.props.user.id
      // set pet_id here too
    });
  }
  sendReportToDatabase = () => {
    console.log('in send fed report to database');
    axios({
      method: 'POST', 
      url: '/api/activities', 
      data: this.state
    }).then((response) => {
      console.log('Success!', response.data); 
    }).catch((error) => {
      console.log('Error posting report', error); 
    })
  }
  render() {
    let content = null;
    console.log(date);
    if (this.props.user.userName) {
      content = (
        <div>
          <h2>Fed Report</h2>
          <img src="http://placekitten.com/250/250" alt="a kitten"/>
          <p>Pet Name Here</p>
          {/* this will be populated via props from the dashboard */}
          {/* change date and time to pickers that default the current date and time */}
          <form>
          <TextField
            id="date"
            type="date"
            defaultValue={date}
            onChange={this.handleInputChangeFor('date')}/>
            <br/>
          <TextField
            id="time"
            type="time"
            defaultValue={time}
            onChange={this.handleInputChangeFor('time')}/>
            <br/>
            <InputLabel>Notes: </InputLabel>
              <br/>
            <TextField onChange={this.handleInputChangeFor('notes')}/>
            <Button onClick={this.sendReportToDatabase}>Submit</Button>
            <Link to="/dashboard">Cancel</Link>
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
export default connect(mapStateToProps)(FedReport); 