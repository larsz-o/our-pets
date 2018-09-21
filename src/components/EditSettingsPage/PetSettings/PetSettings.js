import React, { Component } from 'react';
import { connect } from 'react-redux';
import { USER_ACTIONS } from '../../../redux/actions/userActions';
import {Checkbox, Switch, Button} from '@material-ui/core'; 
import axios from 'axios';

const mapStateToProps = state => ({
  user: state.user,
  pets: state.beings.currentPets
});

class PetSettings extends Component {
    constructor(props){
        super(props); 
        this.state = {
            activity_settings: {
                feeding: this.props.pet.feeding,
                medications: this.props.pet.medications,
                walking: this.props.pet.walking, 
                litterbox: this.props.pet.litterbox,
                pet_id: this.props.pet.id
            },
            notifications: {
                text_alert_walk: this.props.pet.walking,
                text_alert_fed: this.props.pet.feeding,
                text_alert_litterbox: this.props.pet.litterbox,
                text_alert_medications: this.props.pet.medications
            }
        }
    }
  componentDidMount() {
    this.props.dispatch({type: USER_ACTIONS.FETCH_USER});
  }
  componentDidUpdate() {
    if (!this.props.user.isLoading && this.props.user.userName === null) {
      this.props.history.push('/home');
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
  // these functions should be refactored
  handleChangeForFeeding = () => {
    this.setState({
        activity_settings: {
            ...this.state.activity_settings, 
            feeding: !this.state.activity_settings.feeding,
        }
    });
  }
  handleChangeForLitterbox = () => {
    this.setState({
        activity_settings: {
            ...this.state.activity_settings, 
            litterbox: !this.state.activity_settings.litterbox,
        }
    });
  }
  handleChangeForMedications = () => {
    this.setState({
        activity_settings: {
            ...this.state.activity_settings, 
            medications: !this.state.activity_settings.medications,
        }
    });
  }
  handleChangeForWalking = () => {
    this.setState({
        activity_settings: {
            ...this.state.activity_settings, 
            walking: !this.state.activity_settings.walking,
        }
    });
  }
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
          alert('Pet removed.');
          this.getPets();
      }).catch((error) => {
          console.log('Error removing pet', error);
      });
  }
  updatePetSettings = () => {
      console.log('in updatePetSettings')
      axios({
          method: 'PUT', 
          url: '/api/pets/settings', 
          data: this.state.activity_settings
      }).then((response) => {
          console.log(response.data); 
          alert('Settings updated!');
          this.getPets();
      }).catch((error) => {
          console.log('Error updating pet activity settings', error);
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
          console.log(response.data); 
          this.updatePetSettings();
      }).catch((error) => {
          console.log('Error updating notification settings', error); 
      });
  }
  render() {
    let content = null;

    if (this.props.user.userName && this.props.pet.species_id === 1 && this.props.user.authorized) {
      content = (
        <div>
            {JSON.stringify(this.state)}
            <li className="pet-name-header">{this.props.pet.name}</li>  
            <li>Feeding 
                <Checkbox
                    checked={this.state.activity_settings.feeding}
                    onChange={this.handleChangeForFeeding}
                    value="feeding"
                    color="primary"/>
                <Switch
                    checked={this.state.notifications.text_alert_fed}
                    onChange={this.handleNotificationChangeForFeeding}
                    value="text_alert_fed"/>
            </li>
            <li>Litterbox 
                <Checkbox
                    checked={this.state.activity_settings.litterbox}
                    onChange={this.handleChangeForLitterbox}
                    value="litterbox"
                    color="primary"/>
                <Switch
                    checked={this.state.notifications.text_alert_litterbox}
                    onChange={this.handleNotificationChangeForLitterbox}
                    value="text_alert_litterbox"/>
            </li>
            <li>Medications 
                <Checkbox
                    checked={this.state.activity_settings.medications}
                    onChange={this.handleChangeForMedications}
                    value="medications"
                    color="primary"/>
                <Switch
                    checked={this.state.notifications.text_alert_medications}
                    onChange={this.handleNotificationChangeForMedications}
                    value="text_alert_medications"/>
            </li>
            <Button variant="contained" color="primary" onClick={this.updateUserSettings}>Save</Button>
            <Button variant="outlined" onClick={this.removePet}>Remove Pet</Button>
        </div>
      );
    } else if (this.props.user.userName && this.props.pet.species_id === 2 && this.props.user.authorized){
        content = (
            <div>
                {JSON.stringify(this.state)}
                <li className="pet-name-header">{this.props.pet.name}</li>  
                <li>Feeding 
                    <Checkbox
                        checked={this.state.activity_settings.feeding}
                        onChange={this.handleChangeForFeeding}
                        value="feeding"
                        color="primary"/>
                    <Switch
                        checked={this.state.notifications.text_alert_fed}
                        onChange={this.handleNotificationChangeForFeeding}
                        value="text_alert_fed"/>
                </li>
                <li>Walking
                    <Checkbox
                        checked={this.state.activity_settings.walking}
                        onChange={this.handleChangeForWalking}
                        value="walking"
                        color="primary"/>
                    <Switch
                        checked={this.state.notifications.text_alert_walking}
                        onChange={this.handleNotificationChangeForWalking}
                        value="text_alert_walking"/>
                </li>
                <li>Medications 
                    <Checkbox
                        checked={this.state.activity_settings.medications}
                        onChange={this.handleChangeForMedications}
                        value="medications"
                        color="primary"/>
                    <Switch
                        checked={this.state.notifications.text_alert_medications}
                        onChange={this.handleNotificationChangeForMedications}
                        value="text_alert_medications"/>
                </li>
                <Button variant="contained" color="primary" onClick={this.updateUserSettings}>Save</Button>
                <Button variant="outlined" onClick={this.removePet}>Remove Pet</Button>
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

