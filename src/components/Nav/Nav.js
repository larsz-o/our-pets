import React, { Component } from 'react';
import {Button, Menu, MenuItem} from '@material-ui/core';
import { triggerLogout } from '../../redux/actions/loginActions';
import {connect} from 'react-redux'; 
import {ListRounded} from '@material-ui/icons'; 

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
  handleClose = (url) => {
    this.setState({ anchorEl: null });
    // this.context.router.push(url);

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
         <ListRounded/>
        </Button>
    <Menu
      id="simple-menu"
      anchorEl={anchorEl}
      open={Boolean(anchorEl)}
      onClose={this.handleClose}
      >
          <MenuItem onClick={()=>this.handleClose('/dashboard')}>Dashboard</MenuItem>
          <MenuItem onClick={()=>this.handleClose('/myaccount')}>My Account</MenuItem>
          <MenuItem onClick={()=>this.handleClose('/inbox')}>Inbox</MenuItem>
          <MenuItem onClick={this.logout}>Logout</MenuItem>
      </Menu>   
    </div>
  </div>
    );
  }
}
  
const mapStateToProps = state => ({
  user: state.user,
});
export default connect(mapStateToProps)(Nav);
