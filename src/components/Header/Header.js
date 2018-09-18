import React from 'react';
import {Button} from '@material-ui/core';

const Header = ({ title }) => (
  <div className="instructions">
    <div>
      <h1 className="lead">{ title }</h1>
      <Button
            onClick={this.logout}
          >
            Log Out
          </Button>
    </div>
  </div>
);

export default Header;
