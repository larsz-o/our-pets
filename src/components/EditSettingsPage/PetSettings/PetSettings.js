import React, { Component } from 'react';
import { connect } from 'react-redux';
import { USER_ACTIONS } from '../../../redux/actions/userActions';
import {Switch, Button, ListItem, Avatar} from '@material-ui/core'; 
import axios from 'axios';
import swal from 'sweetalert';
import './petsettings.css'

const mapStateToProps = state => ({
  user: state.user,
  members: state.currentHousehold.currentHouseholdMembers,
  nextPage: state.nextPage.nextPage
});

class PetSettings extends Component {
    constructor(props){
        super(props); 
        this.state = {
            notifications: {
                text_alert_walk: this.props.user.text_alert_walk,
                text_alert_fed: this.props.user.text_alert_fed,
                text_alert_litterbox: this.props.user.text_alert_litterbox,
                text_alert_medications: this.props.user.text_alert_medications
            }
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
  getPets = () => {
    axios({
      method: 'GET', 
      url: `/api/pets?id=${this.props.user.household_id}`
    }).then((response) => {
      const action = {type: 'SET_EXISTING_PETS', payload: response.data};
      this.props.dispatch(action);
    }).catch((error) => {
      console.log('Error getting pets', error);
    })
  }
  //these functions can be refactored 
  handleNotificationChangeForFeeding = () => {
    this.setState({ 
        notifications: {
            ...this.state.notifications,
            text_alert_fed: !this.state.notifications.text_alert_fed
        } 
    });
  };
  handleNotificationChangeForWalking = () => {
    this.setState({ 
        notifications: {
            ...this.state.notifications,
            text_alert_walk: !this.state.notifications.text_alert_walk
        } 
    });
  };
  handleNotificationChangeForLitterbox = () => {
    this.setState({ 
        notifications: {
            ...this.state.notifications,
            text_alert_litterbox: !this.state.notifications.text_alert_litterbox
        } 
    });
  };
  handleNotificationChangeForMedications = () => {
    this.setState({ 
        notifications: {
            ...this.state.notifications,
            text_alert_medications: !this.state.notifications.text_alert_medications
        } 
    });
  };
  removePet = () => {
      axios({
          method: 'DELETE',
          url: `/api/pets/${this.props.pet.id}`
      }).then((response) => {
          swal('Pet removed.');
          this.getPets();
      }).catch((error) => {
          console.log('Error removing pet', error);
      });
  }
  //updates notification settings, then calls edit pets, which will update the data collection settings
  updateUserSettings = () => {
      console.log('in updateUserSettings');
      axios({
          method: 'PUT', 
          url: '/api/user/settings',
          data: this.state.notifications
      }).then((response) => {
          this.props.dispatch({type: USER_ACTIONS.FETCH_USER});
          swal('Settings updated!');
      }).catch((error) => {
          console.log('Error updating notification settings', error); 
      });
  }
  render() {
    let content = null;
   
    if (this.props.user.userName && this.props.pet.species_id === 1 && this.props.user.authorized) {
      content = (
        <div>
                <Avatar
                    alt={this.props.pet.name}
                    src={this.props.pet.image_path}
                    className="settings-avatar"
                    />
            <ListItem className="petNameHeader">{this.props.pet.name}</ListItem>  
            <ListItem>Feeding 
                <Switch
                    checked={this.state.notifications.text_alert_fed}
                    onChange={this.handleNotificationChangeForFeeding}
                    value="text_alert_fed"/>
            </ListItem>
            <ListItem>Litterbox 
                <Switch
                    checked={this.state.notifications.text_alert_litterbox}
                    onChange={this.handleNotificationChangeForLitterbox}
                    value="text_alert_litterbox"/>
            </ListItem>
            <ListItem>Medications 
                <Switch
                    checked={this.state.notifications.text_alert_medications}
                    onChange={this.handleNotificationChangeForMedications}
                    value="text_alert_medications"/>
            </ListItem>
            <Button color="primary" onClick={this.updateUserSettings}>Save</Button>
            <Button onClick={this.removePet}>Remove Pet</Button>
            <br/>
        </div>
      );
    } else if (this.props.user.userName && this.props.pet.species_id === 2 && this.props.user.authorized){
        content = (
            <div>
                    <Avatar
                        alt={this.props.pet.name}
                        src={this.props.pet.image_path}
                        className="settings-avatar"
                    />  
                <ListItem className="petNameHeader">{this.props.pet.name}</ListItem>
                <ListItem>Feeding 
                    <Switch
                        checked={this.state.notifications.text_alert_fed}
                        onChange={this.handleNotificationChangeForFeeding}
                        value="text_alert_fed"/>
                </ListItem>
                <ListItem>Walking
                    <Switch
                        checked={this.state.notifications.text_alert_walk}
                        onChange={this.handleNotificationChangeForWalking}
                        value="text_alert_walking"/>
                </ListItem>
                <ListItem>Medications 
                    <Switch
                        checked={this.state.notifications.text_alert_medications}
                        onChange={this.handleNotificationChangeForMedications}
                        value="text_alert_medications"/>
                </ListItem>
                <Button color="primary" onClick={this.updateUserSettings}>Save</Button>
                <Button onClick={this.removePet}>Remove Pet</Button>
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

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(PetSettings); 

