import React, { Component } from 'react';
import { connect } from 'react-redux';
import swal from 'sweetalert';
import Nav from '../Nav/Nav';
import { USER_ACTIONS } from '../../redux/actions/userActions';
import {Button, Input, Select, MenuItem, InputLabel, Typography, List, ListItem} from '@material-ui/core'; 
import ReactFilestack from 'filestack-react';

const mapStateToProps = state => ({
  user: state.user,
  pets: state.householdBuilder.household.pets,
  nextPage: state.nextPage.nextPage
});
const options = {
  accept: 'image/*',
  maxFiles: 1,
  storeTo: {
    location: 's3',
  },
};
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
       walking: false, 
       litterbox: true
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
  navigateToNextPage = () => {
      this.props.history.push('/addusers'); 
  }
  //callback function from fileStack upload 
  getPictureURL = (result) => {
    let url = result.filesUploaded[0].url; 
    this.setState({
      image_path: url
    });
    swal('Looking good!', 'Picture added', 'success'); 
  }
  //sendPetsInfoToRedux dispatches the pets entered so that it can be used as the rest of the information is collected.
  // once this form is completed, users are sent to the next page to enter information about any co-owners. 
  sendPetsInfoToRedux = () => {
    const action = {type: 'SET_NEW_PETS', payload: this.state};
    this.props.dispatch(action); 
    swal('Nice!', 'Pet added!', 'success');
    this.setState({
      pet_name: '', 
      image_path: ''
    })
  }
  render() {
    let content = null;
    if (this.props.user.userName) {
      content = (
        <div className="container">
          <Typography variant="headline">Add Pets</Typography>
                <InputLabel>
                    Pet's Name: 
                </InputLabel>
                <Input type="text" value={this.state.pet_name} onChange={this.handleInputChangeFor('pet_name')} required/><br/>
                <InputLabel>
                Species: 
                </InputLabel>
                <Select value={this.state.species_id} onChange={(event)=>this.handleInputChangeForSpeciesID(event)} required>
                    <MenuItem value={1}>Cat</MenuItem>
                    <MenuItem value={2}>Dog</MenuItem>
                </Select> <br/>
                <InputLabel>
                Birthday: 
                </InputLabel>
                <Input type="date" value={this.state.birthday} onChange={this.handleInputChangeFor('birthday')} required/><br/><br/>
               <ReactFilestack
                  apikey='ACGkY2eEqTDG52A5eOG3Az'
                  buttonText="UPLOAD PHOTO"
                  buttonClass="filestackButton"
                  options={options}
                  onSuccess={this.getPictureURL}/><br/><br/>
                  
                <Button variant="contained" color="primary" onClick={this.sendPetsInfoToRedux}>Add Pet</Button>
                <List>
         {this.props.pets.map((pet, i) => {
           return(
             <ListItem key={i}>{pet.pet_name}</ListItem>
           );
         })}
         </List>
         <Button onClick={()=>this.props.history.push('/createhousehold')}>Go Back</Button>
         <Button color="primary" onClick={this.navigateToNextPage}>Done Adding Pets</Button>
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