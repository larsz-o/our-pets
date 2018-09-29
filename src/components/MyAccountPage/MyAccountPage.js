import React, { Component } from 'react';
import { connect } from 'react-redux';
import Nav from '../Nav/Nav';
import { USER_ACTIONS } from '../../redux/actions/userActions';
import {Paper, Button, IconButton, Typography, Avatar} from '@material-ui/core'; 
import ReactFilestack from 'filestack-react';
import axios from 'axios';
import swal from 'sweetalert'; 
import {Home, GroupAdd} from '@material-ui/icons';

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
  constructor(props){
    super(props);
    this.state = {
      open: false; 
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
  handleIconClick = () => {
    this.setState({
      open: true
    });
  }
  navToProfile = (id) => {
    console.log(id);
    this.props.history.push(`/#/account/${id}`);
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
          url: '/api/household/removeself',
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
          <div className="float-right">
          <IconButton size="small" color="secondary" onClick={this.handleIconClick}><Home/></IconButton>
          </div>
          <Typography variant="headline">Welcome, {this.props.user.first_name}!</Typography>
          <br/>
          <Paper>
            <img src={this.props.user.image_path} alt={this.props.user.username} className="center"/>
            <br/>
            <ReactFilestack
                  apikey='ACGkY2eEqTDG52A5eOG3Az'
                  buttonText="Upload new user photo"
                  buttonClass="filestackButton"
                  options={options}
                  onSuccess={this.getPictureURL}/>
              <Typography><span className="bold">Current Pets:</span></Typography><br/>
             {this.props.pets.map((pet, i) => {
               return(
                <div className="mini-card" key={i}>
                <Avatar
                alt={pet.name}
                src={pet.image_path}
                className="avatar"
              /><br/>
                    {pet.name}<br/> 
                    <a href={ `/#/account/${pet.id}` }><Button size="small" color="primary">View Profile</Button></a><br/> 
                </div>
                  );
              })}
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