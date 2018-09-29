import React, {Component} from 'react';
import {Typography} from '@material-ui/core';
import './Header.css';

class Header extends Component{
  render(){
    return(
    <div className="instructions">
      <Typography id="heading" variant="display4">Our Pets</Typography>
      <Typography id="subheading" variant="body1">Did you feed them?</Typography>
  </div>
    );
  }
}

export default Header;
