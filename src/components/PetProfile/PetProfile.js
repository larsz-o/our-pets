import React, { Component } from 'react';
import {Typography, InputLabel, MenuItem, Button, Select} from '@material-ui/core'; 
import {connect} from 'react-redux';
import axios from 'axios'; 
import moment from 'moment';
import Nav from '../Nav/Nav';
import ReportingData from '../ReportingTableComponent/ReportingTableComponent';
import ReactFilestack from 'filestack-react';
import swal from 'sweetalert';

const mapStateToProps = state => ({
    user: state.user,
    pets: state.currentHousehold.currentPets,
    members: state.currentHousehold.currentHouseholdMembers, 
    nextPage: state.nextPage.nextPage
});
const options = {
  accept: 'image/*',
  maxFiles: 1,
  storeTo: {
    location: 's3',
  },
};
class PetProfile extends Component {
    constructor(props){
        super(props);
        this.state = {
            pet: [], 
            query_limit: 5,
            activity_id: 1, 
            activityData: []
        }
    }
    componentDidMount =() => {
        const { match: { params } } = this.props;
        axios.get(`/api/pets/profile?id=${params.petId}`)
          .then((response)=> {
            console.log('pet', response.data);
            this.setState({ 
                pet: response.data 
            });
            this.getActivityData();
          }).catch((error)=> {
              console.log('Error getting pet', error); 
          });
      }; 
      componentDidUpdate() {
        if (!this.props.user.isLoading && this.props.user.userName === null) {
          this.props.dispatch({type: 'NEXT_PAGE', payload: '/inbox'});
          this.props.history.push(this.props.nextPage);
        }
      }
      getActivityData = () => {
          console.log('petid', this.state.pet[0].id, 'activityid', this.state.activity_id, 'query', this.state.query_limit);
        if(this.state.activity_id === '1' || this.state.activity_id === '3'){
          axios({
            method: 'GET', 
            url: `/api/activities/data?pet=${this.state.pet[0].id}&activity=${this.state.activity_id}&limit=${this.state.query_limit}`
          }).then((response) => {
            console.log(response.data);
            this.setState({
              ...this.state, 
              activityData: response.data
            });
          }).catch((error) => {
            console.log('Error getting activity data', error); 
          });
        } else if (this.state.activity_id === '2' || this.state.activity_id === '4'){
          axios({
            method: 'GET', 
            url: `/api/activities/expandeddata?pet=${this.state.pet[0].id}&activity=${this.state.activity_id}&limit=${this.state.query_limit}`
          }).then((response) => {
            console.log(response.data);
            this.setState({
              ...this.state, 
              activityData: response.data
            })
          }).catch((error) => {
            console.log('Error getting activity data', error); 
          });
        }
      }
      getPet = () => {
        axios.get(`/api/pets/profile?id=${this.state.pet[0].id}`)
          .then((response)=> {
            console.log('pet', response.data);
            this.setState({ 
                pet: response.data 
            });
          }).catch((error)=> {
              console.log('Error updating pet photo', error); 
          });
      }
      getPictureURL = (result) => {
        let url = result.filesUploaded[0].url; 
        console.log(url); 
        axios({
          method: 'PUT', 
          url: '/api/pets/', 
          data: {url: url, id: this.state.pet[0].id}
        }).then((response) => {
          this.getPet();
        }).catch((error) => {
          console.log('Error updating photo', error);
        })
      }
      handleChangeFor = (property, event) => {
          console.log(event.target.value);
        this.setState({
          [property]: event.target.value
        });
      }
      getPets = () => {
        axios({
          method: 'GET', 
          url: `/api/pets?id=${this.props.user.household_id}`
        }).then((response) => {
          const action = {type: 'SET_EXISTING_PETS', payload: response.data};
          this.props.dispatch(action);  
          this.props.history.push('/dashboard');  
        }).catch((error) => {
          console.log('Error getting pets', error); 
        });
      }
 //removes pet 
  removePet = (pet) => {
    swal({
      title: `Are you sure you want to remove this pet?`,
      icon: 'warning', 
      buttons: true,
      dangerMode: true
  }).then((willDelete) => {
    if (willDelete){
      axios({
        method: 'DELETE', 
        url: `/api/pets?id=${pet.id}`,
      }).then((response) => {
        swal(`${pet.name} has been removed`, {icon: 'success'});
        this.getPets(); 
      }).catch((error) => {
        console.log('Error removing pet', error); 
      });
    } 
  });
  }
render(){
    return(
    <div>
        <Nav/>
       {this.state.pet.map((pet, i) => {
           return(
               <div key={i}>
               <Typography variant="display1">{pet.name}</Typography>
               <Button size="small" color="primary" onClick={()=>this.removePet(pet)}>Remove Pet</Button>
               <img src={pet.image_path} alt={pet.name}/>
               <ReactFilestack
                  apikey='ACGkY2eEqTDG52A5eOG3Az'
                  buttonText="Update pet photo"
                  buttonClass="filestackButton"
                  options={options}
                  onSuccess={this.getPictureURL}/>
               <Typography>Birthday: {moment(pet.birthday).format('MMMM do, YYYY')}</Typography>
               </div>
           );
       })}
       <div>
       <InputLabel>Activity </InputLabel> 
          <Select value={this.state.activity_id} onChange={(event)=>this.handleChangeFor('activity_id', event)}>
            <MenuItem value="1">Feedings</MenuItem>
            <MenuItem value="2">Walks</MenuItem>
            <MenuItem value="3">Litterbox Changes</MenuItem>
            <MenuItem value="4">Medications</MenuItem>
          </Select>
          <br/>
          <InputLabel>Limit Results To: </InputLabel>
          <Select value={this.state.query_limit} onChange={(event)=>this.handleChangeFor('query_limit', event)}>
            <MenuItem value={5}>5</MenuItem>
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={20}>20</MenuItem>
            <MenuItem value={30}>30</MenuItem>
          </Select>
            <Button onClick={this.getActivityData}>Submit</Button>
            <div className="reports-div">
            <ReportingData activityID={this.state.activity_id} activityData={this.state.activityData}/>
          </div>
        </div>
    </div>
        );
    }
}
export default connect(mapStateToProps)(PetProfile); 