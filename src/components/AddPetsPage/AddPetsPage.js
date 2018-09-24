import React, { Component } from 'react';
import { connect } from 'react-redux';
import swal from 'sweetalert';
import Nav from '../Nav/Nav';
import { USER_ACTIONS } from '../../redux/actions/userActions';
import {Button, Input, Select, MenuItem, ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, Checkbox} from '@material-ui/core'; 

const mapStateToProps = state => ({
  user: state.user,
  pets: state.householdBuilder.household.pets,
  nextPage: state.nextPage.nextPage
});

class AddPetsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
       pet_name: '',
       species_id: 1,
       birthday: '2018-01-01', 
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
      this.props.dispatch({type: 'NEXT_PAGE', payload: '/inbox'});
      this.props.history.push(this.props.nextPage);
    }
  }
  handleInputChangeFor = propertyName => (event) => { 
    this.setState({
      [propertyName]: event.target.value,
    });
  }
  // sets the values for walking/litterbox properties according to species 
  handleInputChangeForSpeciesID = (event) => {
    let speciesInteger = event.target.value;  
    if (speciesInteger === 1){
      this.setState({
        species_id: speciesInteger,
        walking: false, 
        litterbox: true
      });
    } else if (speciesInteger === 2){
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
    swal('Nice!', 'Pet added!', 'success');
  }
  render() {
    let content = null;
    if (this.props.user.userName) {
      content = (
        <div>
          <ExpansionPanel>
            <ExpansionPanelSummary><h2>Add Pets</h2></ExpansionPanelSummary>
            <ExpansionPanelDetails>
                <label>
                    Pet's Name: 
                </label>
                <Input type="text" value={this.state.pet_name} onChange={this.handleInputChangeFor('pet_name')} required/>
            </ExpansionPanelDetails>
            <ExpansionPanelDetails>
                <label>
                Species: 
                </label>
                <Select value={this.state.species_id} onChange={(event)=>this.handleInputChangeForSpeciesID(event)} required>
                    <MenuItem value={1}>Cat</MenuItem>
                    <MenuItem value={2}>Dog</MenuItem>
                </Select> 
              </ExpansionPanelDetails>
            <ExpansionPanelDetails>
                <label>
                Birthday: 
                </label>
                <Input type="date" value={this.state.birthday} onChange={this.handleInputChangeFor('birthday')} required/>
            </ExpansionPanelDetails>
            <ExpansionPanelDetails>
                {/* this will be changed into a FileStack or Uppy component */}
                <label>
                Image: 
                </label>
                <Input type="text" value={this.state.image_path} onChange={this.handleInputChangeFor('image_path')} required/>
            </ExpansionPanelDetails>
            <ExpansionPanelDetails>
               <p>Any medications to track?</p> <Checkbox id="medication" value={this.state.medications.toString()} unchecked="false" onChange={this.handleMedicationChange}/>
            </ExpansionPanelDetails>
            <ExpansionPanelDetails>
                <Button variant="contained" onClick={this.sendPetsInfoToRedux}>Add Pet</Button>
            </ExpansionPanelDetails>
          </ExpansionPanel>
            
       
           
         
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