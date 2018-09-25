import React, { Component } from 'react';
import { connect } from 'react-redux';
import Nav from '../Nav/Nav';
import '../Inbox/inbox.css';
import ComposeMessage from '../ComposeMessage/ComposeMessage';
import ArchivedMessages from '../ArchivedMessages/ArchivedMessages'
import NewMessages from '../NewMessages/NewMessages'; 
import SentMessages from '../SentMessages/SentMessages';
import axios from 'axios';
import { USER_ACTIONS } from '../../redux/actions/userActions';

const mapStateToProps = state => ({
  user: state.user,
  nextPage: state.nextPage.nextPage
});
class Inbox extends Component {
  constructor(props){
    super(props);
    this.state = {
      messages: [],
    }
  }
  componentDidMount() {
    this.props.dispatch({type: USER_ACTIONS.FETCH_USER});
    this.getMessages();
}
  componentDidUpdate() {
    if (!this.props.user.isLoading && this.props.user.userName === null) {
      this.props.dispatch({type: 'NEXT_PAGE', payload: '/inbox'});
      this.props.history.push(this.props.nextPage);
    }
  }
  //gets current messages when component mounts 
  getMessages = () => {
    axios({
      method: 'GET',
      url: '/api/inbox?archived=false'
    }).then((response) => {
      this.setState({
        messages: response.data
      });
    }).catch((error) => {
      console.log('Error getting messages', error); 
    });
  }
  render() {
    let content = null;
    if (this.props.user.userName && this.state.messages.length > 0) {
      content = (
        <div>
          <ComposeMessage/>
          <NewMessages messages={this.state.messages}/>
          <ArchivedMessages/>
          <SentMessages/>
        </div>
        );
    } else if (this.props.user.userName && this.state.messages.length === 0){
      content = (
        <div>
          <ComposeMessage/>
          <p>No new messages.</p>
          <ArchivedMessages/>
          <SentMessages/>
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
export default connect(mapStateToProps)(Inbox); 