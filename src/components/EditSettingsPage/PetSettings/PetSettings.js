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
  render() {
    let content = null;

    if (this.props.user.userName && this.props.pet.species_id === 1) {
      content = (
        <div>
            <li className="pet-name-header">{this.props.pet.name}</li>  
            <li>Feeding 
                <Checkbox
                    checked={this.state.activity_settings.feeding}
                    onChange={this.handleChangeForFeeding}
                    value="feeding"
                    color="primary"/>
                <Switch
                    checked={this.state.checkedA}
                    onChange={this.handleChange('checkedA')}
                    value="checkedA"/>
            </li>
            <li>Litterbox 
                <Checkbox
                checked={this.state.activity_settings.litterbox}
                onChange={this.handleChangeForLitterbox}
                value="litterbox"
                color="primary"/>
            </li>
            <li>Medications 
                <Checkbox
                checked={this.state.activity_settings.medications}
                onChange={this.handleChangeForMedications}
                value="medications"
                color="primary"/>
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

