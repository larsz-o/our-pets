import React, {Component} from 'react'; 
import {connect} from 'react-redux'; 
import {Button, Typography, CardContent} from '@material-ui/core'; 
import './petcard.css';
import moment from 'moment'; 
import axios from 'axios';

const mapStateToProps = state => ({
    user: state.user,
  });
 
class PetCard extends Component {

logFeeding = (id) => {
    console.log('clicked log feeding');
    let date = new Date();
    let currentDate =  moment(date).format('LL');
    let currentTime = moment(date).format('h:mm:ss a');
    let feedLog = {
        date: currentDate, 
        time: currentTime,
        activity_id: 1,
        pet_id: id,
        person_id: this.props.user.id
    }
    axios({
        method: 'POST',
        url: '/api/activities/fed',
        data: feedLog
    }).then((response) => {
        console.log('success', response.data);
        alert('Success!');
    }).catch((error) => {
        console.log('Error posting feeding log', error);
    })
}
handleClick = (property) => {
    this.props.history.push(property); 
}
///change fed and litterbox reports to functions that just grab the current date and time
//and do a post request to the activity_details table
//then work on the date and time pickers to make the current date and time default 

    render(){
        let content = null; 
     if(this.props.pet.species_id === 2 && this.props.user.userName){
         content = (
        <div className="card">
                <img src={this.props.pet.image_path} alt="pet"/>
                <CardContent>
                <Typography gutterBottom variant="headline" component="h2">test{this.props.pet.name}</Typography>           
                    <Typography gutterBottom variant="body1">Last walked: 9/19/18 at 8:00am</Typography>
                     <Button onClick={()=> this.handleClick('walkreport')} variant="contained" color="primary">Walked</Button>
                    <Typography gutterBottom variant="body1">Last fed: 9/19/18 at 8:00am </Typography>
                    <Button onClick={()=>this.logFeeding(this.props.pet.id)} variant="contained" color="primary">Fed</Button>
                    <Typography gutterBottom variant="body1">Medications last given: 9/19/18 at 8:00am</Typography>
                    <Button onClick={()=> this.handleClick('medicationreport')} variant="contained" color="primary">Medications Given</Button>
                    </CardContent>
                </div>
         );
     } else if (this.props.pet.species_id === 1 && this.props.user.userName){
        content = (
            
            <div className="card">
               <img src={this.props.pet.image_path} alt="pet"/>
               <CardContent>
               <Typography gutterBottom variant="headline" component="h2">{this.props.pet.name}</Typography>
                   <Typography gutterBottom variant="body1">Litterbox last changed: 9/19/18 at 8:00am</Typography>
                    <Button onClick={()=> this.logLitterbox(this.props.pet.id)} variant="contained" color="primary">Litterbox Changed</Button>
                   <Typography gutterBottom variant="body1">Last fed: 9/19/18 at 8:00am </Typography>
                   <Button onClick={()=> this.logFeeding(this.props.pet.id)} variant="contained" color="primary">Fed</Button>
                   <Typography gutterBottom variant="body1">Medications last given: 9/19/18 at 8:00am</Typography>
                   <Button onClick={()=> this.handleClick('medicationreport')} variant="contained" color="primary">Medications Given</Button>
                   </CardContent>
        </div>
        
        );
     }
        return(
            <div>
                {content}
            </div>
        );
    }
}
export default connect(mapStateToProps)(PetCard); 