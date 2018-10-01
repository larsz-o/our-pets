import React, { Component } from 'react';
import {Button, Menu, MenuItem} from '@material-ui/core';
import { triggerLogout } from '../../redux/actions/loginActions';
import {connect} from 'react-redux'; 

class Nav extends Component {
  constructor(props){
    super(props);
    this.state = {
        anchorEl: null,
    }
  }
  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };
  handleClose = () => {
    this.setState({ anchorEl: null });
  };
  logout = () => {
    this.props.dispatch(triggerLogout());
  }

  render(){
    const { anchorEl } = this.state;
    
    return(
  <div className="navbar">
    <div>
    <Button
          aria-owns={anchorEl ? 'simple-menu' : null}
          aria-haspopup="true"
          onClick={this.handleClick}
        >
         Menu
        </Button>
    <Menu
      id="simple-menu"
      anchorEl={anchorEl}
      open={Boolean(anchorEl)}
      onClose={this.handleClose}
      >
          <a href="/#/dashboard"><MenuItem onClick={this.handleClose}>Dashboard</MenuItem></a>
          <a href="/#/inbox"><MenuItem onClick={this.handleClose}>Inbox</MenuItem></a>
          <a href="/#/myaccount"><MenuItem onClick={this.handleClose}>My Account</MenuItem></a>
          <a href="/#/editsettings"><MenuItem onClick={this.handleClose}>Settings</MenuItem></a>
          <a href="/#/selecthousehold"><MenuItem onClick={this.handleClose}>Switch Household</MenuItem></a>
          <a href="/#/about"><MenuItem onClick={this.handleClose}>About</MenuItem></a>
          <MenuItem onClick={this.logout}>Logout</MenuItem>
      </Menu>   
    </div>
  </div>
    );
  }
}
  
export default connect()(Nav);
