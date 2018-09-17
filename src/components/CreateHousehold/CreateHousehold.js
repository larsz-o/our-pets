import React, { Component } from 'react';
import { connect } from 'react-redux';

import Nav from '../Nav/Nav';
import { USER_ACTIONS } from '../../redux/actions/userActions';

const mapStateToProps = state => ({
  user: state.user,
});

class CreateHousehold extends Component {
  constructor(props) {
    super(props);

    this.state = {
        person_id: this.props.user.id,
        nickname: '',
        authorized: true, 
        role_id: 1
    };
  }

  componentDidMount() {
    this.props.dispatch({type: USER_ACTIONS.FETCH_USER});
  }

  componentDidUpdate() {
    if (!this.props.user.isLoading && this.props.user.userName === null) {
      this.props.history.push('home');
    }
  }
  handleInputChangeFor = propertyName => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  }
  //sendNickNameToRedux dispatches the household nickname entered so that it can be used as the rest of the household information 
  //is collected.
  // once this form is completed, users are sent to the next page to enter information about their pets. 
  sendNickNameToRedux = (event) => {
    event.preventDefault(); 
    const action = {type: 'SET_NICKNAME', payload: this.state};
    this.props.dispatch(action); 
    this.props.history.push('/addpets'); 
  }

  render() {
    let content = null;

    if (this.props.user.userName) {
      content = (
        <div>
          <h2>Create Household</h2>
         <form onSubmit={this.sendNickNameToRedux}>
         <div>
           <label>
             Household Nickname: 
           </label>
              <input type="text" value={this.state.nickname} onChange={this.handleInputChangeFor('nickname')} placeholder="e.g. The Sullivans"/>
           </div>
         <button type="submit">Submit</button>
         </form>
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
export default connect(mapStateToProps)(CreateHousehold); 