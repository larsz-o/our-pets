import React, { Component } from 'react';
import { connect } from 'react-redux';
import { triggerLogin, formError, clearError } from '../../redux/actions/loginActions';
import { USER_ACTIONS } from '../../redux/actions/userActions';
import {Button, Typography, InputLabel, Input} from '@material-ui/core'; 


const mapStateToProps = state => ({
  user: state.user,
  login: state.login,
});

class LoginPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
    };
  }

  componentDidMount() {
    this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
    this.props.dispatch(clearError());
  }

  componentDidUpdate() {
    if (!this.props.user.isLoading && this.props.user.userName !== null) {
      this.props.history.push('/selecthousehold');
    }
  }
  createAccount = () => {
    this.props.history.push('/register');
  }
  login = (event) => {
    event.preventDefault();

    if (this.state.username === '' || this.state.password === '') {
      this.props.dispatch(formError());
    } else {
      this.props.dispatch(triggerLogin(this.state.username, this.state.password));
    }
  }

  handleInputChangeFor = propertyName => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  }

  renderAlert() {
    if (this.props.login.message !== '') {
      return (
        <h2
          className="alert"
          role="alert"
        >
          { this.props.login.message }
        </h2>
      );
    }
    return (<span />);
  }

  render() {
    return (
      <div>
        { this.renderAlert() }
        <div className="picture-div">
          <img src="https://www.sciencedaily.com/images/2018/06/180605172505_1_540x360.jpg" width="100%" alt="dog"/>
        </div>
        <form>
          <Typography variant="headline">Login</Typography>
          <div>
            <InputLabel htmlFor="username">
              Username:
              <Input
                type="text"
                value={this.state.username}
                onChange={this.handleInputChangeFor('username')}
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
              />
            </InputLabel>
          </div>
          <div>
            <Button onClick={this.login}>Log In</Button>
            <Button onClick={this.createAccount}>Create Account</Button>
          </div>
        </form>
      </div>
    );
  }
}

export default connect(mapStateToProps)(LoginPage);
