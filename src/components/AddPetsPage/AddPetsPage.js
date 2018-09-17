import React, { Component } from 'react';
import { connect } from 'react-redux';

import Nav from '../Nav/Nav';
import { USER_ACTIONS } from '../../redux/actions/userActions';

const mapStateToProps = state => ({
  user: state.user,
});

class AddPetsPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
       pet_name: '',
       species: '',
       image_path: '',
       medications: false
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
    const action = {type: 'SET_PETS', payload: this.state};
    this.props.dispatch(action); 
  }

  render() {
    let content = null;
    console.log(this.state); 
    if (this.props.user.userName) {
      content = (
        <div>
            <h2>Add Pets</h2>
         <form onSubmit={this.sendPetsInfoToRedux}>
            <div>
                <label>
                    Pet's Name: 
                </label>
                <input type="text" value={this.state.pet_name} onChange={this.handleInputChangeFor('pet_name')}/>
            </div>
            <div>
                <label>
                Species: 
                </label>
                <select value={this.state.species} onChange={this.handleInputChangeFor('species')}>
                <option value="">---Select One---</option>
                    <option value="cat">Cat</option>
                    <option value="dog">Dog</option>
                </select> 
            </div>
            <div>
                {/* this will be changed into a FileStack or Uppy component */}
                <label>
                Image: 
                </label>
                <input type="url" value={this.state.image_path} onChange={this.handleInputChangeFor('image_path')}/>
            </div>
            <div>
                {/* this will be changed into a FileStack or Uppy component */}
                <label>
                Any medications to track?: 
                </label>
                <input type="checkbox" id="medication" value={this.state.medications} unchecked="false" onChange={this.handleMedicationChange}/>
            </div>
            <button>Add Pet</button>
         </form>

         {/* display pet lists here  */}
         <button onClick={this.navigateToNextPage}>Done Adding Pets</button>
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