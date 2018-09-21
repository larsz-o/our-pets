import React, {Component} from 'react'; 
import {connect} from 'react-redux'; 
import {Button, Typography, Input, CardContent, Dialog, DialogActions, DialogContent, DialogTitle, DialogContentText, TextField, InputLabel, Checkbox} from '@material-ui/core'; 
import './petcard.css';
import moment from 'moment'; 
import axios from 'axios';

const mapStateToProps = state => ({
    user: state.user,
  });

class PetCard extends Component {
    constructor(props){
        super(props);
        this.state = {
            config: {
                open: false,
                poop_check: false, 
                medication: '',
                time_start: '00:00:00',
                time_end: '00:00:00',
                notes: ''
            },
            lastWalk: [],
            lastFeeding: [],
            lastMedication: [],
            lastLitterbox: []
          }
    }
    componentDidMount(){
        this.getActivityData(1, this.props.pet.id);
        this.getActivityData(2, this.props.pet.id);
        this.getActivityData(3, this.props.pet.id);
        this.getActivityData(4, this.props.pet.id);
    }
    getActivityData = (activityId, petId) => {
        console.log('in getActitity data');
        axios({
            method: 'GET', 
            url: `/api/activities?activity=${activityId}&pet=${petId}`
        }).then((response) => {
            console.log(response.data);
            if (activityId == 1){
                this.setState({
                    lastFeeding: response.data 
                });
            } else if(activityId == 2){
                this.setState({
                    lastWalk: response.data
                });
            } else if (activityId == 3){
                this.setState({
                    lastLitterbox: response.data
                });
            } else if (activityId == 4){
                this.setState({
                    lastMedication: response.data
                });
            }
        }).catch((error) => {
            console.log('Error getting activity data');
        })
    }
  handleChange = (property, event) => {
    this.setState({
        config: {
            [property]: event.target.value
        }
    });
  };
  handleClickOpen = () => {
    this.setState({ 
        config: {
            open: true
        }
     });
  };
  handleClose = () => {
    this.setState({ 
        config:{
            open: false
        } 
    });
  }; 
  logWalk = (id) => {
    let date = new Date();
    let currentDate =  moment(date).format('LL');
    let currentTime = moment(date).format('h:mm:ss a');
    let walkLog = {
        date: currentDate, 
        time: currentTime, 
        time_start: this.state.config.time_start,
        time_end: this.state.config.time_end,
        notes: this.state.config.notes,
        poop_check: this.state.config.poop_check,
        activity_id: 2, 
        person_id: this.props.user.id, 
        pet_id: id
    }
    axios({
        method: 'POST',
        url: '/api/activities/',
        data: walkLog
    }).then((response) => {
        console.log('success', response.data);
        this.handleClose(); 
        this.getActivityData(2, this.props.pet.id)
        //get current data and update DOM
    }).catch((error) => {
        console.log('Error submitting walk report', error); 
    });
  }
//calculates current date and time to post to the database as time and date of feeding
  logFeeding = (id) => {
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
        url: '/api/activities/',
        data: feedLog
    }).then((response) => {
        this.getActivityData(1, this.props.pet.id)
        alert('Success!');
    }).catch((error) => {
        console.log('Error posting feeding log', error);
    });
}
 logMedication = (id) => {
    let date = new Date();
    let currentDate =  moment(date).format('LL');
    let currentTime = moment(date).format('h:mm:ss a');
    let medLog = {
        date: currentDate, 
        time: currentTime,
        activity_id: 4,
        pet_id: id,
        person_id: this.props.user.id, 
        medication: this.state.config.medication
    }
    axios({
        method: 'POST',
        url: '/api/activities/',
        data: medLog
    }).then((response) => {
        this.handleClose();
        this.getActivityData(4, this.props.pet.id)
        alert('Success!');
    }).catch((error) => {
        console.log('Error posting feeding log', error);
    });
   }
 //calculates current date and time to post to the database as time and date of litterbox change
  logLitterbox = (id) => {
    let date = new Date();
    let currentDate =  moment(date).format('LL');
    let currentTime = moment(date).format('h:mm:ss a');
    let litterLog = {
        date: currentDate, 
        time: currentTime,
        activity_id: 3,
        pet_id: id,
        person_id: this.props.user.id
    }
    axios({
        method: 'POST',
        url: '/api/activities/',
        data: litterLog
    }).then((response) => {
        this.getActivityData(3, this.props.pet.id)
        alert('Success!');
    }).catch((error) => {
        console.log('Error posting feeding log', error);
    });
}
togglePoopCheck = () => {
    this.setState({
      poop_check: !this.state.config.poop_check
    });
  }
    render(){
        let content = null; 
     if(this.props.pet.species_id === 2 && this.props.user.userName){
         content = (
    <div>
        {JSON.stringify(this.state.history)}
        <div className="card">
                <img src={this.props.pet.image_path} alt="pet"/>
                <CardContent>
                <Typography gutterBottom variant="headline" component="h2">test{this.props.pet.name}</Typography>           
                    <Typography gutterBottom variant="body1">{this.state.lastWalk.map((lastWalk, i) => {
                        return (
                            <span key={i}>Last walked: {moment(lastWalk.date).format('LL')} at {moment(lastWalk.time).format('h:mm:ss a')}</span>
                        );
                    })}</Typography>
                     <Button onClick={this.handleClickOpen} variant="contained" color="primary">Walked</Button>
                    <Typography gutterBottom variant="body1">{this.state.lastFeeding.map((lastFed, i) => {
                        return(
                           <span key={i}>Last fed: {moment(lastFed.date).format('LL')} at {moment(lastFed.time).format('h:mm:ss a')}</span>
                        );
                    })}</Typography>
                    <Button onClick={()=>this.logFeeding(this.props.pet.id)} variant="contained" color="primary">Fed</Button>
                    <Typography gutterBottom variant="body1">{this.state.lastMedication.map((lastMed, i) => {
                        return(
                           <span key={i}>Last Medications Given: {moment(lastMed.date).format('LL')} at {moment(lastMed.time).format('h:mm:ss a')}</span>
                        );
                    })}</Typography>
                    <Button onClick={()=>this.logMedication(this.props.pet.id)} variant="contained" color="primary">Medications Given</Button>
                    </CardContent>
                </div>
                <Dialog open={this.state.config.open} onClose={this.handleClose} aria-labelledby="walk-dialog-title">
                    <DialogTitle id="walk-dialog-title">Walk Report</DialogTitle>
                    <DialogContent>
                        <DialogContentText>How did your walk go?</DialogContentText>
                    <form>
                    <InputLabel>Time Start:</InputLabel>
                    <Input
                        type="time"
                        value={this.state.config.time_start}
                        onChange={(event)=>this.handleChange('time_start', event)}/>
                        <br/>
                    <InputLabel>Time End:</InputLabel>
                    <Input
                        type="time"
                        value={this.state.config.time_end}
                        onChange={(event)=>this.handleChange('time_end', event)}/>
                    <InputLabel>Poop Check</InputLabel>
                    <Checkbox
                        onChange={this.togglePoopCheck}
                        color="primary"/>
                         <TextField
                        autoFocus
                        margin="dense"
                        id="notes"
                        label="notes"
                        type="text"
                        onChange={(event)=>this.handleChange('notes', event)}
                        fullWidth
                        />
                    </form>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">Cancel</Button>
                        <Button onClick={()=>this.logWalk(this.props.pet.id)} color="primary">Submit</Button>
                    </DialogActions>
                </Dialog>
    </div>
         );
     } else if (this.props.pet.species_id === 1 && this.props.user.userName){
        content = (
        <div>
            <div className="card">
               <img src={this.props.pet.image_path} alt="pet"/>
               <CardContent>
               <Typography gutterBottom variant="headline" component="h2">{this.props.pet.name}</Typography>
                   <Typography gutterBottom variant="body1">{this.state.lastLitterbox.map((lastLitter, i) => {
                        return(
                           <span key={i}>Last Litterbox Change: {moment(lastLitter.date).format('LL')} at {moment(lastLitter.time).format('h:mm:ss a')}</span>
                        );
                    })}</Typography>
                    <Button onClick={()=> this.logLitterbox(this.props.pet.id)} variant="contained" color="primary">Litterbox Changed</Button>
                   <Typography gutterBottom variant="body1">{this.state.lastFeeding.map((lastFed, i) => {
                        return(
                           <span key={i}>Last fed: {moment(lastFed.date).format('LL')} at {moment(lastFed.time).format('h:mm:ss a')}</span>
                        );
                    })}</Typography>
                   <Button onClick={()=> this.logFeeding(this.props.pet.id)} variant="contained" color="primary">Fed</Button>
                   <Typography gutterBottom variant="body1">{this.state.lastMedication.map((lastMed, i) => {
                        return(
                           <span key={i}>Medications Last Given: {moment(lastMed.date).format('LL')} at {moment(lastMed.time).format('h:mm:ss a')}</span>
                        );
                    })}</Typography>
                   <Button onClick={this.handleClickOpen} variant="contained" color="primary">Medications Given</Button>
                   </CardContent>
        </div>
        <Dialog open={this.state.config.open} onClose={this.handleClose} aria-labelledby="med-dialog-title">
                    <DialogTitle id="med-dialog-title">Walk Report</DialogTitle>
                    <DialogContent>
                        <DialogContentText>What medication did you give?</DialogContentText>
                        <TextField
                        autoFocus
                        margin="dense"
                        id="notes"
                        label="Medication name"
                        type="text"
                        onChange={(event)=>this.handleChange('medication', event)}
                        fullWidth
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">Cancel</Button>
                        <Button onClick={()=>this.logMedication(this.props.pet.id)} color="primary">Submit</Button>
                    </DialogActions>
                </Dialog>
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