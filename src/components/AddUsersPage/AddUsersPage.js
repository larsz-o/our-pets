import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios'; 
import swal from 'sweetalert';
import Nav from '../Nav/Nav';
import { USER_ACTIONS } from '../../redux/actions/userActions';
import {Button, Input} from '@material-ui/core'; 

const mapStateToProps = state => ({
  user: state.user,
  findUser: state.householdBuilder.findUser,
  nextPage: state.nextPage.nextPage
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
    const action = {type: 'SET_NEW_USERS', payload: { person_id: member.id, username: member.username, role: 2, authorized: false} };
    this.props.dispatch(action); 
    this.props.history.push('/confirmhousehold'); 
  }
  componentDidMount() {
    this.props.dispatch({type: USER_ACTIONS.FETCH_USER});
  }

  componentDidUpdate() {
    if (!this.props.user.isLoading && this.props.user.userName === null) {
      this.props.dispatch({type: 'NEXT_PAGE', payload: '/inbox'});
      this.props.history.push(this.props.nextPage);
    }
  }
  handleInputChangeFor = propertyName => (event) => { 
    this.setState({
      [propertyName]: event.target.value,
    });
  }
  navigateToNextPage = () => {
    swal('FYI', 'If you want to add users to your household later, they will have to search for your household by its nickname.', 'warning'); 
      this.props.history.push('/confirmhousehold'); 
  }
  //searchForUsers queries the database for the entered search term and adds the results to the redux state
  searchForUsers = () => {
      let searchTerm = '%' + this.state.search_term + '%'; 
      console.log(searchTerm); 
    axios({
        method: 'GET',
        url: `/api/household/user?username=${searchTerm}`
    }).then((response) => {
        let userToAdd = response.data;
        if (userToAdd.username !== ''){
        console.log(userToAdd); 
        const action = {type: 'SET_SEARCHED_USER', payload: userToAdd};
        this.props.dispatch(action); 
    }
    }).catch((error) => {
        swal(':(', 'Could not find user.', 'warning'); 
        console.log('Error finding user', error); 
    })
  } // end searchForUsers

  render() {
    console.log(this.state);
    let content = null;
    if (this.props.user.userName) {
      content = (
        <div>
        <h2>Search for Registered Users</h2>
              <Input type="text" placeholder="Search by username" value={this.state.search_term} onChange={this.handleInputChangeFor('search_term')}/> 
              <Button onClick={this.searchForUsers}>Submit</Button>
              <div>
            <h3>Found Users:</h3>
            <ul>
            {this.props.findUser.map((member, i) => {
                return(
                    <li key={i}>{member.username} <Button onClick={()=>this.addUserToHousehold(member)}>Add User to Household</Button></li> 
                );
            })}
            </ul>
        </div>
          <Button onClick={this.navigateToNextPage}>Skip This Step</Button>
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