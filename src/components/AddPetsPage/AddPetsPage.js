import React, { Component } from 'react';
import { connect } from 'react-redux';

import Nav from '../Nav/Nav';
import { USER_ACTIONS } from '../../redux/actions/userActions';
import {Button} from '@material-ui/core'; 

const mapStateToProps = state => ({
  user: state.user,
  pets: state.household.household.pets
});

class AddPetsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
       pet_name: '',
       species_id: 0,
       birthday: '01-01-2018', 
       image_path: '',
       medications: false,
       feeding: true, 
       walking: '', 
       litterbox: ''
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
  // sets the values for walking/litterbox properties according to species 
  handleInputChangeForSpeciesID = (event) => {
    let speciesInteger = parseInt(event.target.value, 10); 
    console.log(speciesInteger); 
    if (event.target.value === 1){
      this.setState({
        species_id: speciesInteger,
        walking: false, 
        litterbox: true
      });
    } else if (event.target.value === 2){
      this.setState({
        species_id: speciesInteger,
        walking: true, 
        litterbox: false
      });
    }
  }
  handleMedicationChange = () => {
      this.setState({
          medications: !this.state.medications
      });
  }
  navigateToNextPage = () => {
      this.props.history.push('/addusers'); 
  }
  //sendPetsInfoToRedux dispatches the pets entered so that it can be used as the rest of the information is collected.
  // once this form is completed, users are sent to the next page to enter information about any co-owners. 
  sendPetsInfoToRedux = () => {
    const action = {type: 'SET_NEW_PETS', payload: this.state};
    this.props.dispatch(action); 
    alert('Pet added!');
  }
  render() {
    let content = null;
    if (this.props.user.userName) {
      content = (
        <div>
            <h2>Add Pets</h2>
         <form>
            <div>
                <label>
                    Pet's Name: 
                </label>
                <input type="text" value={this.state.pet_name} onChange={this.handleInputChangeFor('pet_name')} required/>
            </div>
            <div>
                <label>
                Species: 
                </label>
                <select onChange={this.handleInputChangeForSpeciesID} required>
                <option value="">---Select One---</option>
                    <option value="1">Cat</option>
                    <option value="2">Dog</option>
                </select> 
            </div>
            <div>
                <label>
                Birthday: 
                </label>
                <input type="date" value={this.state.birthday} onChange={this.handleInputChangeFor('birthday')} required/>
            </div>
            <div>
                {/* this will be changed into a FileStack or Uppy component */}
                <label>
                Image: 
                </label>
                <input type="text" value={this.state.image_path} onChange={this.handleInputChangeFor('image_path')} required/>
            </div>
            <div>
                {/* this will be changed into a FileStack or Uppy component */}
                <label>
                Any medications to track?: 
                </label>
                <input type="checkbox" id="medication" value={this.state.medications} unchecked="false" onChange={this.handleMedicationChange}/>
            </div>
            <Button onClick={this.sendPetsInfoToRedux}>Add Pet</Button>
         </form>
         {this.props.pets.map((pet, i) => {
           return(
             <li key={i}>{pet.pet_name}</li>
           );
         })}
         <Button onClick={this.navigateToNextPage}>Done Adding Pets</Button>
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
export default connect(mapStateToProps)(AddPetsPage); 