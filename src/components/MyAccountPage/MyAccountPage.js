import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom'; 
import Nav from '../Nav/Nav';
import { USER_ACTIONS } from '../../redux/actions/userActions';
import {Paper} from '@material-ui/core'; 

const mapStateToProps = state => ({
  user: state.user,
  pets: state.currentHousehold.currentPets,
  members: state.currentHousehold.currentHouseholdMembers,
  household: state.currentHousehold.householdNickname
});

class MyAccount extends Component {
  componentDidMount() {
    this.props.dispatch({type: USER_ACTIONS.FETCH_USER});
  }
  componentDidUpdate() {
    if (!this.props.user.isLoading && this.props.user.userName === null) {
      this.props.history.push('home');
    }
  }
  render() {
    let content = null;

    if (this.props.user.userName) {
      content = (
        <div>
          <h1>Welcome, {this.props.user.first_name}</h1>
          <Link to='/editsettings' className="float-right">Edit Settings</Link>
          <br/>
          <Paper>
            <img src={this.props.user.image_path} alt={this.props.user.username}/>
            <p>Upload user photo:</p>
              <p>Household Name: {this.props.household.map((name, i) => {
                return(
                  <span key={i}>{name.nickname}</span>
                );
              })}</p>
              <p>Pets:  
             {this.props.pets.map((pet, i) => {
               return(
                <span key={i}>  {pet.name}  </span>);
              })}
              </p>
              <p>Household Members: 
                {this.props.members.map((member, i) => {
                  return(
                    <span key={i}>  {member.username}  </span>
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