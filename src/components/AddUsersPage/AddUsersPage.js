import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios'; 

import Nav from '../Nav/Nav';
import { USER_ACTIONS } from '../../redux/actions/userActions';

const mapStateToProps = state => ({
  user: state.user,
});

class AddUsersPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
        person_id: '',
        authorized: true, 
        role_id: 2,
        search_term: ''
    };
  }

  componentDidMount() {
    this.props.dispatch({type: USER_ACTIONS.FETCH_USER});
  }

  componentDidUpdate() {
    if (!this.props.user.isLoading && this.props.user.userName === null) {
      this.props.history.push('home');
    }
  }
  handleInputChangeFor = propertyName => (event) => { 
    this.setState({
      [propertyName]: event.target.value,
    });
  }
  navigateToNextPage = () => {
      this.props.history.push('/addusers'); 
  }
  searchForUsers = () => {
      let searchTerm = this.state.search_term; 
      console.log(searchTerm); 
    axios({
        method: 'GET',
        url: `/api/household?username=${searchTerm}`
    }).then((response) => {
        let userToAdd = response.data;
        console.log(userToAdd);
    //     if (userToAdd.username !== ''){
    //     alert(`${userToAdd.username} found! Awesome!`); 
    // } else {
    //     alert(`Could not find user.`); 
    // }
    }).catch((error) => {
        console.log('Error finding user', error); 
    })
  }
  //sendUsersInfoToRedux dispatches the user entered to the Redux Store 
  sendUsersInfoToRedux = () => {
    const action = {type: 'SET_USERS', payload: this.state};
    this.props.dispatch(action); 
  }

  render() {
    let content = null;
    console.log(this.state); 
    if (this.props.user.userName) {
      content = (
        <div>
            {/* search for users here -- will need to display them on the DOM and confirm that the user should be added before adding */}
          <h2>Search for Registered Users: </h2>
          <input type="text" placeholder="Search by username" value={this.state.search_term} onChange={this.handleInputChangeFor('search_term')}/> 
          <button onClick={this.searchForUsers}>Submit</button>
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
export default connect(mapStateToProps)(AddUsersPage); 