import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios'; 

import Nav from '../Nav/Nav';
import { USER_ACTIONS } from '../../redux/actions/userActions';

const mapStateToProps = state => ({
  user: state.user,
  findUser: state.household.findUser
});

class AddUsersPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
    newUser: {
        person_id: '',
        username: '',
        authorized: true, 
        role_id: 2
        },
    search_term: ''
    };
  }
  addUserToHousehold = (member) => {
    this.setState({
        ...this.state,
        newUser: {
            person_id: member.id,
            username: member.username
        }
    });
    const action = {type: 'SET_USERS', payload: this.state.newUser};
    this.props.dispatch(action); 
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
      this.props.history.push('/confirmhousehold'); 
  }
  //searchForUsers queries the database for the entered search term and adds the results to an array in local state
  searchForUsers = () => {
      let searchTerm = this.state.search_term; 
      console.log(searchTerm); 
    axios({
        method: 'GET',
        url: `/api/household?username=${searchTerm}`
    }).then((response) => {
        let userToAdd = response.data;
        if (userToAdd.username !== ''){
        alert(`${userToAdd[0].username} found! Awesome!`); 
        const action = {type: 'SET_SEARCHED_USER', payload: userToAdd};
        this.props.dispatch(action); 
    }
    }).catch((error) => {
        alert(`Could not find user.`); 
        console.log('Error finding user', error); 
    })
  } // end searchForUsers
  //sendUsersInfoToRedux dispatches the user entered to the Redux Store 
  sendUsersInfoToRedux = () => {
    const action = {type: 'SET_USERS', payload: this.state};
    this.props.dispatch(action); 
  }

  render() {
    let content = null;
    if (this.props.user.userName) {
      content = (
        <div>
             {JSON.stringify(this.props.userList)}
          <h2>Search for Registered Users: </h2>
          <input type="text" placeholder="Search by username" value={this.state.search_term} onChange={this.handleInputChangeFor('search_term')}/> 
          <button onClick={this.searchForUsers}>Submit</button>
        <div>
            <button onClick={this.navigateToNextPage}>Skip This Step</button>

            <h3>Found Users:</h3>
            <ul>
            {this.props.findUser.map((member, i) => {
                return(
                    <li key={i}>{member.username} <button onClick={()=>this.addUserToHousehold(member)}>Add User to Household</button></li> 
                );
            })}
            </ul>
            <button>Cancel Adding User</button>
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
export default connect(mapStateToProps)(AddUsersPage); 