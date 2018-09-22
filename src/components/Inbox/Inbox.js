import React, { Component } from 'react';
import { connect } from 'react-redux';
import Nav from '../Nav/Nav';
import { USER_ACTIONS } from '../../redux/actions/userActions';
import AcceptRequest from '../AcceptRequest/AcceptRequest';


const mapStateToProps = state => ({
  user: state.user,
  pets: state.currentHousehold.currentPets,
  members: state.currentHousehold.currentHouseholdMembers
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
//this needs more logic to have messages appear if there is one pending 
    if (this.props.user.userName && !this.props.user.authorized) {
      content = (
        <div>
            <p>You have a pending invitation</p>
            <AcceptRequest/>
        </div>
      );
    } else if(this.props.user.userName && this.props.user.authorized) {
       content = (
        <div>
            You have # of pending requests
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