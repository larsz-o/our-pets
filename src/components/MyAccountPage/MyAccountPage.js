import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom'; 
import Nav from '../Nav/Nav';
import { USER_ACTIONS } from '../../redux/actions/userActions';
import {Card, CardContent} from '@material-ui/core'; 

const mapStateToProps = state => ({
  user: state.user,
});

class MyAccount extends Component {
  componentDidMount() {
    this.props.dispatch({type: USER_ACTIONS.FETCH_USER});
  }

  componentDidUpdate() {
    if (!this.props.user.isLoading && this.props.user.userName === null) {
      this.props.history.push('home');
    }
  }

  render() {
    let content = null;

    if (this.props.user.userName) {
      content = (
        <div>
          <h1>Welcome, {this.props.user.first_name}</h1>
          <Link to='/editsettings' className="float-right">Edit Settings</Link>
          <Card>
            <CardContent>
              <p>Household Name: [need to get this on the user object from props -- new query to join households table with person]</p>
              <p>Pets: </p>
            </CardContent>
          </Card>
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
export default connect(mapStateToProps)(MyAccount); 