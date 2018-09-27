import React, {Component} from 'react';
import {Button, Dialog, DialogTitle, DialogContent, Input, InputLabel, Select, MenuItem} from '@material-ui/core';
import axios from 'axios';
import swal from 'sweetalert';
import {connect} from 'react-redux'; 
import { USER_ACTIONS } from '../../redux/actions/userActions';
import ReactFilestack from 'filestack-react';

const mapStateToProps = state => ({
    user: state.user,
    household: state.householdBuilder.findHousehold,
    nextPage: state.nextPage.nextPage,
    allMembers: state.allHouseholds.allHouseholdMembers,
  });
  const options = {
    accept: 'image/*',
    maxFiles: 1,
    storeTo: {
      location: 's3',
    },
  };

class ComposeMessage extends Component {
    constructor(props){
        super(props);
        this.state = {
            open: false,
            receiver: 0,
            message: '',
            subject: '',
            image_path: '',
          };
    }
    componentDidMount() {
        this.props.dispatch({type: USER_ACTIONS.FETCH_USER});
      }
      componentDidUpdate() {
        if (!this.props.user.isLoading && this.props.user.userName === null) {
          this.props.dispatch({type: 'NEXT_PAGE', payload: '/inbox'});
          this.props.history.push(this.props.nextPage);
        }
      }
       //callback function from fileStack upload 
  getPictureURL = (result) => {
    let url = result.filesUploaded[0].url; 
    this.setState({
      image_path: url
    });
  }
    handleClickOpen = () => {
        console.log('clicked');
        this.setState({ open: true });
      };
    handleClose = () => {
        this.setState({ open: false });
      };
    handleInputChangeFor = (property, event) => { 
        console.log(event.target);
        this.setState({
          [property]: event.target.value,
        });
      }
sendMessage = () => {
    this.setState({
        open: false
    });
    let date = new Date(); 
    axios({
        method: 'POST', 
        url: 'api/inbox', 
        data: {receiver: this.state.receiver, subject: this.state.subject, message: this.state.message, date: date, invitation: false, image_path: this.state.image_path}
    }).then((response) => {
        swal('Success!', 'Message sent!', 'success');
        this.setState({
            message: '',
            receiver: 0, 
            subject: ''
        });
    }).catch((error) => {
        swal('Oh no!', 'Error sending message', 'warning'); 
        console.log('Error sending message', error); 
    });
}
    render(){
    let content = null;
        if (this.props.user.userName){
        content = (
            <div className="right">
            <Button size="small" onClick={this.handleClickOpen} variant="contained" color="primary">Compose Message</Button>
            <Dialog 
                open={this.state.open}
                onClose={this.handleClose}
                aria-labelledby="compose-message-title">
                <DialogTitle id="compose-message-title">
                    New Message
                </DialogTitle>
                <DialogContent>
                    To: 
                    <Select value={this.state.receiver} onChange={(event)=>this.handleInputChangeFor('receiver', event)}>
                    {this.props.householdMembers.map((person, i) => {
                        if(person.member !== this.props.user.id){
                            return(
                                <MenuItem key={i} value={person.member}>{person.first_name}</MenuItem>
                            );
                        }
                    })}
                    </Select>
                </DialogContent>
                <DialogContent>
                    <InputLabel>Subject: </InputLabel> <Input value={this.state.subject} onChange={(event)=>this.handleInputChangeFor('subject', event)}/><br/>
                   <InputLabel>Message: </InputLabel>  <Input value={this.state.message} onChange={(event)=>this.handleInputChangeFor('message', event)}/><br/>
                    <ReactFilestack
                        apikey='ACGkY2eEqTDG52A5eOG3Az'
                        buttonText="Upload picture"
                        buttonClass="filestackButton"
                        options={options}
                        onSuccess={this.getPictureURL}/>
                </DialogContent>
                <DialogContent>
                    <Button variant="outlined" color="secondary" onClick={this.handleClose}>Cancel</Button><Button variant="outlined" color="primary" onClick={this.sendMessage}>Send</Button>
                </DialogContent>
            </Dialog>
            </div>
        );
        }
        return (
            <div>
              { content }
            </div>
          );
    }
}
export default connect(mapStateToProps)(ComposeMessage); 