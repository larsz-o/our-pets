import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios'; 

import Nav from '../Nav/Nav';
import { USER_ACTIONS } from '../../redux/actions/userActions';
import {Button} from '@material-ui/core'; 

const mapStateToProps = state => ({
  user: state.user,
  findUser: state.findUser.findUser
});

class AddUsersPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search_term: ''
    };
  }
  addUserToHousehold = (member) => {
    console.log(member); 
    const action = {type: 'SET_USERS', payload: { person_id: member.id, username: member.username, authorized: true, role_id: 2} };
    this.props.dispatch(action); 
    this.props.history.push('/confirmhousehold'); 
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
        url: `/api/household/user?username=${searchTerm}`
    }).then((response) => {
        let userToAdd = response.data;
        if (userToAdd.username !== ''){
        alert(`${userToAdd[0].username} found! Awesome!`); 
        console.log(userToAdd); 
        const action = {type: 'SET_SEARCHED_USER', payload: userToAdd};
        this.props.dispatch(action); 
    }
    }).catch((error) => {
        alert(`Could not find user.`); 
        console.log('Error finding user', error); 
    })
  } // end searchForUsers

  render() {
    console.log(this.state);
    let content = null;
    if (this.props.user.userName) {
      content = (
        <div>
             {JSON.stringify(this.props.userList)}
          <h2>Search for Registered Users: </h2>
          <input type="text" placeholder="Search by username" value={this.state.search_term} onChange={this.handleInputChangeFor('search_term')}/> 
          <Button onClick={this.searchForUsers}>Submit</Button>
        <div>
            <Button onClick={this.navigateToNextPage}>Skip This Step</Button>

            <h3>Found Users:</h3>
            <ul>
            {this.props.findUser.map((member, i) => {
                return(
                    <li key={i}>{member.username} <Button onClick={()=>this.addUserToHousehold(member)}>Add User to Household</Button></li> 
                );
            })}
            </ul>
            <Button>Cancel Adding User</Button>
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