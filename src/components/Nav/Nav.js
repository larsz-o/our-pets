import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {Button} from '@material-ui/core';
import { triggerLogout } from '../../redux/actions/loginActions';
import {connect} from 'react-redux'; 

class Nav extends Component {
  logout = () => {
    this.props.dispatch(triggerLogout());
  }
  render(){
    return(
  <div className="navbar">
    <div>
      <ul>
        <li>
        <Button component={Link} to="/dashboard">Dashboard</Button>
        </li>
        <li>
        <Button component={Link} to="/myaccount">My Account</Button>
        </li>
        <li>
        <Button component={Link} to="/inbox">Inbox</Button>
        </li>
        <li>
        <Button className="float-right" onClick={this.logout}>Log Out</Button>
        </li>
      </ul>
    </div>
  </div>
    );
  }
}
  
const mapStateToProps = state => ({
  user: state.user,
});
export default connect(mapStateToProps)(Nav);
