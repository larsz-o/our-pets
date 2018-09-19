import React, { Component } from 'react';
import { connect } from 'react-redux';
import PetCard from './PetCard/PetCard';
import axios from 'axios'; 
import Nav from '../Nav/Nav';
import { USER_ACTIONS } from '../../redux/actions/userActions';
import {Button} from '@material-ui/core'; 

const mapStateToProps = state => ({
  user: state.user,
});

class Dashboard extends Component {
  addMorePets = () => {
    
  }
  componentDidMount() {
    this.props.dispatch({type: USER_ACTIONS.FETCH_USER});
    this.getPets();
  }

  componentDidUpdate() {
    if (!this.props.user.isLoading && this.props.user.userName === null) {
      this.props.history.push('home');
    }
  }
  getPets = () => {
    axios({
      method: 'GET', 
      url: '/'
    })
  }
  navigateTo = () => {
    this.props.history.push('/createhousehold'); 
  }
  render() {
    let content = null;

    if (this.props.user.userName) {
      content = (
        <div>
           <div id="welcome">
              <h1>Welcome, { this.props.user.userName }!</h1>
              {/* do logic to figure this out */}
              <h3>You currently [are/are not] in a household!</h3>
              <Button color="primary"variant="outlined" onClick={this.navigateTo}>Create Household</Button>
              <Button color="primary" variant="outlined">Join Household</Button>
            </div>
          <PetCard/>
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
export default connect(mapStateToProps)(Dashboard);
