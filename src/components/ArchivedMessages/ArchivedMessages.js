import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import './inbox.css';
import {Button, ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails} from '@material-ui/core';
import ExpandMore from '@material-ui/icons/ExpandMore'; 

const mapStateToProps = state => ({
    user: state.user,
  });
class ArchivedMessages extends Component {
    constructor(props){
        super(props);
        this.state = {
          archivedMessages: []
        }
      }
componentDidMount() {
    this.props.dispatch({type: USER_ACTIONS.FETCH_USER});
    this.getArchivedMessages();
}
//gets old messages upon component mounting successfully
getArchivedMessages = () => {
    axios({
      method: 'GET',
      url: '/api/inbox?archived=true'
    }).then((response) => {
      this.setState({
        archivedMessages: response.data
      });
      this.getMessages(); 
    }).catch((error) => {
      console.log('Error getting messages', error); 
    });
  }
    render(){
        return(
        <div>
           <h3>Archived Messages: </h3>
             {this.state.archivedMessages.map((oldMessage, i) => {
               return(
                <div key={i}>
                    <ExpansionPanel>
                      <ExpansionPanelSummary expandIcon={<ExpandMore/>}>Message from {oldMessage.sender} - {moment(oldMessage.date).format('MM-DD-YYYY')}</ExpansionPanelSummary>
                      <ExpansionPanelDetails>{oldMessage.message}</ExpansionPanelDetails>
                    </ExpansionPanel>
                  </div>
               );
             })}
           </div>
        );
    }
}
export default connect(mapStateToProps)(ArchivedMessages);