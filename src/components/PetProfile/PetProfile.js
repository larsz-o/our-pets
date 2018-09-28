import React, { Component } from 'react';
import {Typography} from '@material-ui/core'; 
import {connect} from 'react-redux';
import axios from 'axios'; 
import moment from 'moment';

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
            pet: []
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
          }).catch((error)=> {
              console.log('Error getting pet', error); 
          });
      }; 
render(){
    return(
    <div>
       {this.state.pet.map((pet, i) => {
           return(
               <div key={i}>
               <Typography variant="display1">{pet.name}</Typography>
               <img src={pet.image_path} alt={pet.name}/>
               <Typography variant="headline">Born: {moment(pet.birthday).format('MMMM Do YYYY')}</Typography>
               </div>
           );
       })}
    </div>
        );
    }
}
export default connect(mapStateToProps)(PetProfile); 