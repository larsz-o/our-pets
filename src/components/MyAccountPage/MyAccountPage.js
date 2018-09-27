import React, { Component } from 'react';
import { connect } from 'react-redux';
import Nav from '../Nav/Nav';
import { USER_ACTIONS } from '../../redux/actions/userActions';
import {Paper, Button} from '@material-ui/core'; 
import ReactFilestack from 'filestack-react';
import axios from 'axios';
import swal from 'sweetalert'; 

const mapStateToProps = state => ({
  user: state.user,
  pets: state.currentHousehold.currentPets,
  members: state.currentHousehold.currentHouseholdMembers,
  household: state.currentHousehold.householdNickname,
  totalHouses: state.allHouseholds.totalUserHouseholds,
  nextPage: state.nextPage.nextPage
});
const options = {
  accept: 'image/*',
  maxFiles: 1,
  storeTo: {
    location: 's3',
  },
};
class MyAccount extends Component {
  componentDidMount() {
    this.props.dispatch({type: USER_ACTIONS.FETCH_USER});
  }
  componentDidUpdate() {
    if (!this.props.user.isLoading && this.props.user.userName === null) {
      this.props.dispatch({type: 'NEXT_PAGE', payload: '/inbox'});
      this.props.history.push(this.props.nextPage);
    }
  }
  getPictureURL = (result) => {
    let url = result.filesUploaded[0].url; 
    axios({
      method: 'PUT', 
      url: '/api/user/photo', 
      data: {url: url}
    }).then((response) => {
      this.props.dispatch({type: USER_ACTIONS.FETCH_USER});
    })
  }
//removes member from household
    removeFromHousehold = (house) => {
      swal({
        title: `Are you sure you want to leave this household?`,
        icon: 'warning', 
        buttons: true,
        dangerMode: true
    }).then((willDelete) => {
      if (willDelete){
        axios({
          method: 'DELETE', 
          url: '/api/household/removefrom',
          data: {household_id: house.household_id}
        }).then((response) => {
          swal('You have been removed.', {icon: 'success'});
          this.getHouseholdMembers(); 
        }).catch((error) => {
          console.log('Error removing member', error); 
        });
      } else {
        swal(`Could not remove you from this household. Please try again.`);
      }
    });
    }
  render() {
    let content = null;

    if (this.props.user.userName) {
      content = (
        <div>
          <h1>Welcome, {this.props.user.first_name}</h1>
          <br/>
          <Paper>
            <img src={this.props.user.image_path} alt={this.props.user.username}/>
            <ReactFilestack
                  apikey='ACGkY2eEqTDG52A5eOG3Az'
                  buttonText="Upload user photo"
                  buttonClass="filestackButton"
                  options={options}
                  onSuccess={this.getPictureURL}/>
              <p>Current Household Name: {this.props.household.map((name, i) => {
                return(
                  <span key={i}>{name.nickname}</span>
                );
              })}</p>
              <p>All Households:</p>
              <ul>{this.props.totalHouses.map((house, i)=> {
                return(
                  <li key={i}>{house.nickname} <Button onClick={()=>this.removeFromHousehold(house)}>Leave Household</Button></li>
                );
              })}</ul> 
              <p>Pets:  
             {this.props.pets.map((pet, i) => {
               return(
                <span key={i}> {pet.name}  </span>);
              })}
              </p>
              <p>Household Members: 
                {this.props.members.map((member, i) => {
                  return(
                    <span key={i}>  {member.first_name}  </span>
                  );
                })}
              </p>
          </Paper> 
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
export default connect(mapStateToProps)(MyAccount); 