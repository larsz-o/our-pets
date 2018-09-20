import React, {Component} from 'react';
import {Button} from '@material-ui/core';
import {connect} from 'react-redux'; 
import { triggerLogout } from '../../redux/actions/loginActions';

class Header extends Component{
  logout = () => {
    this.props.dispatch(triggerLogout());
  }
  navTo = (page) => {
    this.props.history.push(page); 
  }
  render(){
    return(
    <div className="instructions">
      <div>
        <h1 className="lead">Our Pets</h1>
        <Button className="float-right" onClick={this.logout}>Log Out</Button>
    </div>
  </div>
    );
  }
}
const mapStateToProps = state => ({
  user: state.user,
});
export default connect(mapStateToProps)(Header);
