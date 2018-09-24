import React, {Component} from 'react';
import {connect} from 'react-redux'; 
import {Input, Button} from '@material-ui/core';
import axios from 'axios';
import swal from 'sweetalert'; 

const mapStateToProps = state => ({
    user: state.user,
    household: state.householdBuilder.findHousehold
  });
class JoinHousehold extends Component {
    constructor(props){
        super(props);
        this.state = {
            search_term: '',
            results: []
        }
    }
    getHouseholdMembers = (householdID) => {
        axios({
          method: 'GET', 
          url: `/api/household/members?id=${householdID}`
        }).then((response) => {
          let members = response.data;
          console.log(members); 
          this.requestJoin(members);
        }).catch((error) => {
          console.log('Error getting household members', error); 
        })
      }
    handleSearchTermChange = (event) => {
        this.setState({
            search_term: event.target.value
        });
    }
    // sends an alert to the admin for the household asking to join the house
    requestJoin = (arrayOfMembers) => {
        for(let i = 0; i < arrayOfMembers.length; i++){
            console.log('in request join');
            if(arrayOfMembers[i].role === 1){
                axios({
                    method: 'POST', 
                    url: '/api/inbox', 
                    data: {sender: this.props.user.id, receiver: arrayOfMembers[i].id, message: `Hi ${arrayOfMembers[i].first_name}! I'd like to join your household so that we can coordinate pet care! Do you accept?`}
                }).then((response) => {
                    swal('Sent!', `Request sent to ${arrayOfMembers[i].first_name}.`, 'success');
                }).catch((error) => {
                    console.log('Error sending request', error); 
                });
            }
        }
    }
    submitSearch = () => {
        axios({
            method: 'GET',
            url: `/api/household?nickname=${this.state.search_term}`
        }).then((response) => {
           const action = {type: 'SET_HOUSE_TO_JOIN', payload: response.data};
           this.props.dispatch(action);
        }).catch((error) => {
            console.log('Error finding household', error); 
        });
    }
    render(){
        return(
            <div>
                <h3>Search for an existing household to join</h3>
                <Input onChange={this.handleSearchTermChange} placeholder="household nickname"/> <Button variant="contained" color="primary" onClick={this.submitSearch}>Search</Button>
                <div>
                    <ul>
                    {this.props.household.map((results, i) => {
                        return(
                            <li key={i}>{results.nickname}<Button variant="contained" onClick={() => this.getHouseholdMembers(results.id)}>Join Household</Button></li>
                        );
                    })}
                    </ul>
                </div>
            </div>
        );
    }
}
export default connect(mapStateToProps)(JoinHousehold); 