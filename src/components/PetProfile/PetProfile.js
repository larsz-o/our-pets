import React, { Component } from 'react';
import {Typography, InputLabel, MenuItem, Button, Select, Paper} from '@material-ui/core'; 
import {connect} from 'react-redux';
import axios from 'axios'; 
import moment from 'moment';
import Nav from '../Nav/Nav';
import ReportingData from '../ReportingTableComponent/ReportingTableComponent';

const mapStateToProps = state => ({
    user: state.user,
    pets: state.currentHousehold.currentPets,
    members: state.currentHousehold.currentHouseholdMembers, 
    nextPage: state.nextPage.nextPage
});

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
      handleChangeFor = (property, event) => {
          console.log(event.target.value);
        this.setState({
          [property]: event.target.value
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
               <img src={pet.image_path} alt={pet.name}/>
               <Typography>Birthday: {moment(pet.birthday).format('MMMM do, YYYY')}</Typography>
               </div>
           );
       })}
       <Paper>
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
            <ReportingData activityID={this.state.activity_id} activityData={this.state.activityData}/>
        </Paper>
    </div>
        );
    }
}
export default connect(mapStateToProps)(PetProfile); 