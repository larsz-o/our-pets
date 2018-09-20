import React, { Component } from 'react';
import { connect } from 'react-redux';
import Nav from '../Nav/Nav';
import { USER_ACTIONS } from '../../redux/actions/userActions';
import PetSettings from './PetSettings/PetSettings';

const mapStateToProps = state => ({
  user: state.user,
  pets: state.beings.currentPets,
  members: state.beings.currentHouseholdMembers
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

    if (this.props.user.userName) {
      content = (
        <div>
        <h2>Pets</h2>
        <ul>
                {this.props.pets.map((pet, i) => {
                     return(
                      <PetSettings key={i} pet={pet}/>
                        );
                    })}
            </ul>
        <h2>Household</h2>
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