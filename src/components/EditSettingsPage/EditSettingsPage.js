import React, { Component } from 'react';
import { connect } from 'react-redux';
import Nav from '../Nav/Nav';
import { USER_ACTIONS } from '../../redux/actions/userActions';
import PetSettings from './PetSettings/PetSettings';
import {Typography, List} from '@material-ui/core'; 

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
  render() {
    let content = null;

    if (this.props.user.userName && this.props.user.role === 1) {
      content = (
        <div className="container">
        <Typography variant="subheading">Edit Notification Settings: </Typography>
        <List>
            {this.props.pets.map((pet, i) => {
                return(
                  <PetSettings history={this.props.history} key={i} pet={pet}/>
                        );
                    })}
            </List>
      </div>
      );
    } else if (this.props.user.userName) {
      content = (
        <div>
        <Typography variant="subheading">Edit Notification Settings: </Typography>
        <div className="container">
        <List>
            {this.props.pets.map((pet, i) => {
                return(
                  <PetSettings history={this.props.history} key={i} pet={pet}/>
                        );
                    })}
            </List>
        </div>
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