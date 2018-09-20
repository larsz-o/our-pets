import React, { Component } from 'react';
import { connect } from 'react-redux';
import { USER_ACTIONS } from '../../../redux/actions/userActions';
import {Checkbox, Switch} from '@material-ui/core'; 

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
                litterbox: this.props.pet.litterbox
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
  render() {
    let content = null;

    if (this.props.user.userName && this.props.pet.species_id === 1) {
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
                    value="text_alert_litterbox"
                    disabled checked value={this.state.litterbox_disabled}/>
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

