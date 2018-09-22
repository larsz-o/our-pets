import React, { Component } from 'react';
import { connect } from 'react-redux';
import Nav from '../Nav/Nav';
import { USER_ACTIONS } from '../../redux/actions/userActions';
import PetSettings from './PetSettings/PetSettings';
import {Button} from '@material-ui/core'; 

const mapStateToProps = state => ({
  user: state.user,
  pets: state.currentHousehold.currentPets,
  members: state.currentHousehold.currentHouseholdMembers,
  household: state.currentHousehold.householdNickname
});

class EditSettings extends Component {
  componentDidMount() {
    this.props.dispatch({type: USER_ACTIONS.FETCH_USER});
  }

  componentDidUpdate() {
    if (!this.props.user.isLoading && this.props.user.userName === null) {
      this.props.history.push('/home');
    }
  }

  render() {
    let content = null;

    if (this.props.user.userName && this.props.user.role === 1) {
      content = (
        <div>
        <h2>Pets</h2>
        <ul>
            {this.props.pets.map((pet, i) => {
                return(
                  <PetSettings history={this.props.history} key={i} pet={pet}/>
                        );
                    })}
            </ul>
        <h2>Household</h2>
        <ul>

        {this.props.members.map((member, i) => {
          return(
            <li key={i}>
            {member.username}  <Button>Remove Member</Button>
            </li>
          );
        })}
        </ul>
        </div>
      );
    } else if (this.props.user.userName) {
      content = (
        <div>
        <h2>Pets</h2>
        <ul>
            {this.props.pets.map((pet, i) => {
                return(
                  <PetSettings history={this.props.history} key={i} pet={pet}/>
                        );
                    })}
            </ul>
        <h2>Household</h2>
        <ul>
        {this.props.members.map((member, i) => {
          return(
            <li key={i}>
            {member.name}
            </li>
          );
        })}
        </ul>
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
export default connect(mapStateToProps)(EditSettings); 