import React, { Component } from 'react';
import {Typography} from '@material-ui/core'; 
import {connect} from 'react-redux';
import axios from 'axios'; 

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
        axios.get(`/api/pets/profile?id=${params.petID}`)
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
        <Typography variant="display1">Reed</Typography>
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCE8G24Fu4UsrfZl8M9pL9OX4zWwyUwGe2tlYgrORGKsllVPuw"/>
        <Typography>December 1, 2011</Typography>
    </div>
        );
    }
}
export default connect(mapStateToProps)(PetProfile); 