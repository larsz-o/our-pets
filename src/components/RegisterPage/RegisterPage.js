import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input';
import {Button, Input, InputLabel, Typography} from '@material-ui/core'; 
import './RegisterPage.css'
import swal from 'sweetalert';

class RegisterPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      confirm_password: '',
      message: '',
      first_name: '',
      phone_number: ''
    };
  }

  registerUser = (event) => {
    event.preventDefault();
    if(this.passwordConfirmationAlert()){ 
    if (this.state.username === '' || this.state.password === '') {
      this.setState({
        message: 'Choose a username and password!',
      });
    } else {
      const body = {
        username: this.state.username,
        password: this.state.password,
        first_name: this.state.first_name, 
        phone_number: this.state.phone_number
      };
      // making the request to the server to post the new user's registration
      axios.post('/api/user/register/', body)
        .then((response) => {
          if (response.status === 201) {
            this.props.history.push('/home');
          } else {
            this.setState({
              message: 'Ooops! That didn\'t work. The username might already be taken. Try again!',
            });
          }
        })
        .catch(() => {
          this.setState({
            message: 'Ooops! Something went wrong! Is the server running?',
          });
        });
      }
    }
  } // end registerUser
  handleInputChangeFor = propertyName => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  }
  renderAlert() {
    if (this.state.message !== '') {
      return (
        <h2
          className="alert"
          role="alert"
        >
          {this.state.message}
        </h2>
      );
    }
    return (<span />);
  }
  passwordConfirmationAlert = () => {
    if (this.state.password === this.state.confirm_password){
      return true;
    } else {
      swal('Oh no!', 'Entered passwords do not match! Try again.', 'warning');
      return false; 
    }
  }
  render() {
    return (
      <div>
        {this.renderAlert()}
        <div className="flex-box">
        <Typography variant="headline">Register</Typography>
        </div>
          <div className="flex-box">
          <form>
          <div>
            <InputLabel htmlFor="username">
              Username:
              <Input
                type="text"
                value={this.state.username}
                onChange={this.handleInputChangeFor('username')}
                required
              />
            </InputLabel>
          </div>
          <div>
            <InputLabel htmlFor="password">
              Password:
              <Input
                type="password"
                value={this.state.password}
                onChange={this.handleInputChangeFor('password')}
                required
              />
            </InputLabel>
          </div>
          <div>
            <InputLabel htmlFor="confirm-password">
              Confirm Password:
              <Input
                type="password"
                name="confirm-password"
                value={this.state.confirm_password}
                onChange={this.handleInputChangeFor('confirm_password')}
                required
              />
            </InputLabel>
          </div>
          <div>
            <InputLabel htmlFor="first-name">
              First Name:
              <Input
                type="text"
                value={this.state.first_name}
                onChange={this.handleInputChangeFor('first_name')}
                required
              />
            </InputLabel>
          </div>
          <div>
            <InputLabel htmlFor="phone-number">
              Phone Number:
              <PhoneInput
              country="US"
              placeholder="Enter phone number"
              value={ this.state.phone_number }
              onChange={ phone_number => this.setState({ phone_number }) }
              required />
            </InputLabel>
          </div>
          <div>
            <Button onClick={this.registerUser}>Submit</Button>
            <Link to="/home">Cancel</Link>
          </div>
        </form>
        </div>
      </div>
    );
  }
}

export default RegisterPage;

