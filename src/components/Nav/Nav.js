import React from 'react';
import { Link } from 'react-router-dom';
import {Button} from '@material-ui/core';

const Nav = () => (
  <div className="navbar">
    <div>
      <ul>
        <li>
          <Button component={Link} to="/home">Home</Button>
        </li>
        <li>
        <Button component={Link} to="/myaccount">My Account</Button>
        </li>
        <li>
        <Button component={Link} to="/dashboard">Dashboard</Button>
        </li>
      </ul>
    </div>
  </div>
);

export default Nav;
