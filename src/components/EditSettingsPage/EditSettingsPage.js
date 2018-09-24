import React, { Component } from 'react';
import { connect } from 'react-redux';
import Nav from '../Nav/Nav';
import { USER_ACTIONS } from '../../redux/actions/userActions';
import PetSettings from './PetSettings/PetSettings';
import {Button} from '@material-ui/core'; 
import axios from 'axios'; 
import swal from 'sweetalert';

const mapStateToProps = state => ({
  user: state.user,
  pets: state.currentHousehold.currentPets,
  members: state.currentHousehold.currentHouseholdMembers,
  household: state.currentHousehold.householdNickname,
  nextPage: state.nextPage.nextPage
});

class EditSettings extends Component {
  componentDidMount() {
    this.props.dispatch({type: USER_ACTIONS.FETCH_USER});
  }

  componentDidUpdate() {
    if (!this.props.user.isLoading && this.props.user.userName === null) {
      this.props.dispatch({type: 'NEXT_PAGE', payload: '/inbox'});
      this.props.history.push(this.props.nextPage);
    }
  }
  getHouseholdMembers = () => {
    axios({
      method: 'GET', 
      url: `/api/household/members?id=${this.props.user.household_id}`
    }).then((response) => {
      const action = {type: 'SET_HOUSEHOLD_MEMBERS', payload: response.data};
      this.props.dispatch(action); 
    }).catch((error) => {
      console.log('Error getting household members', error); 
    })
  }
  //removes member from household
  removeMember = (member) => {
    swal({
      title: `Are you sure? ${member.username} will lose access to this household.`,
      icon: 'warning', 
      buttons: true,
      dangerMode: true
  }).then((willDelete) => {
    if (willDelete){
      axios({
        method: 'PUT', 
        url: '/api/user/removefrom',
        data: {household_id: null, id: member.id}
      }).then((response) => {
        swal('Member removed.', {icon: 'success'});
        this.getHouseholdMembers(); 
      }).catch((error) => {
        console.log('Error removing member'); 
      });
    } else {
      swal(`${member.username} thanks you.`);
    }
  });
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
            {member.first_name}  <Button onClick={()=>this.removeMember(member)}>Remove From Household</Button>
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
            {member.first_name}
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