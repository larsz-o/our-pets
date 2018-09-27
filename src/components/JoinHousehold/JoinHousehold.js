import React, {Component} from 'react';
import {connect} from 'react-redux'; 
import {Input, Button, Typography, Dialog, DialogTitle, DialogContent, DialogActions} from '@material-ui/core';
import axios from 'axios';
import swal from 'sweetalert'; 
import Nav from '../Nav/Nav';
import { USER_ACTIONS } from '../../redux/actions/userActions';

const mapStateToProps = state => ({
    user: state.user,
    household: state.householdBuilder.findHousehold,
    nextPage: state.nextPage.nextPage
  });
class JoinHousehold extends Component {
    constructor(props){
        super(props);
        this.state = {
            search_term: '',
            results: [], 
            open: false, 
            members: []
        }
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
    getHouseholdMembers = (householdID) => {
        this.handleOpen();
        axios({
          method: 'GET', 
          url: `/api/household/members?id=${householdID}`
        }).then((response) => {
          let members = response.data;
          this.setState({
              members: members
          });
        }).catch((error) => {
          console.log('Error getting household members', error); 
        })
      }
      handleOpen = () => {
          this.setState({
              open: true
          });
      }
      handleClose = () => {
          this.setState({
              open: false
          });
      }
    handleSearchTermChange = (event) => {
        let searchTerm = '%' + event.target.value + '%'
        this.setState({
            search_term: searchTerm
        });
    }
    // sends an alert to the admin for the household asking to join the house
    requestJoin = (arrayOfMembers) => {
        this.handleClose();
        if(arrayOfMembers.length === 0){
            swal('Oh no!', 'There is no one in this household! Try searching for another household or creating your own household.', 'warning');
        } else{
            for(let i = 0; i < arrayOfMembers.length; i++){
                console.log('in request join');
                if(arrayOfMembers[i].role === 1){
                    axios({
                        method: 'POST', 
                        url: '/api/inbox', 
                        data: {sender: this.props.user.id, receiver: arrayOfMembers[i].id, subject: 'invitation', message: `Hi ${arrayOfMembers[i].first_name}! I'd like to join your household so that we can coordinate pet care! Do you accept?`}
                    }).then((response) => {
                        swal('Sent!', `Request sent to ${arrayOfMembers[i].first_name}.`, 'success');
                    }).catch((error) => {
                        console.log('Error sending request', error); 
                    });
                } else {
                    swal('Oh no!', 'There is no administrator for this household. Try searching for another household or creating your own.', 'warning');
                }
            }
        }
    }
    submitSearch = () => {
        axios({
            method: 'GET',
            url: `/api/household?nickname=${this.state.search_term}`
        }).then((response) => {
            if(response.data.length === 0){
                swal('Oh no!', 'Household not found.', 'warning'); 
            } else {
                const action = {type: 'SET_HOUSE_TO_JOIN', payload: response.data};
                this.props.dispatch(action);
            }
        }).catch((error) => {
            console.log('Error finding household', error); 
        });
    }
    render(){
        return(
            <div>
                <Nav/>
                <Typography variant="headline" gutterBottom>Search for an existing household to join</Typography>
                <br/>
                <Input onChange={this.handleSearchTermChange} placeholder="Enter nickname"/>  <Button size="small" variant="contained" onClick={this.submitSearch}>Search</Button>
                <div>
                    <ul>
                    {this.props.household.map((results, i) => {
                        return(
                    <span key={i}>
                            <li>{results.nickname}  <Button variant="contained" size="small" onClick={()=>this.getHouseholdMembers(results.id)}>More Details</Button></li>
                        <Dialog
                            open={this.state.open}
                            onClose={this.handleClose}
                            aria-labelledby="compose-message-title">
                        <DialogTitle className="center" id="compose-message-title">
                            Household Details
                        </DialogTitle>
                        <DialogContent>
                            {results.nickname}<br/>
                            <span className="bold">Members:</span> <br/>
                            <ul>
                            {this.state.members.map((member, i) => {
                                return(
                                   <li key={i}>{member.first_name}</li> 
                                );
                            })}
                            </ul>
                            <span className="bold">Pets:</span>
                            <ul>
                            {this.state.members.map((pet, i) => {
                                return(
                                    <li key={i}>{pet.pet_name}</li>
                                );
                            })}
                            </ul>
                            <Button onClick={()=>this.requestJoin(this.state.members)}>Join Household</Button><Button onClick={this.handleClose}>Cancel</Button>
                        </DialogContent>
                            </Dialog>
                     </span>
                        );
                    })}
                    </ul>
                 
                </div>
            </div>
        );
    }
}
export default connect(mapStateToProps)(JoinHousehold); 