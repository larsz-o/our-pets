import React, {Component} from 'react'; 
import {connect} from 'react-redux'; 
import {Button, Typography, CardActionArea, CardContent} from '@material-ui/core'; 

const mapStateToProps = state => ({
    user: state.user,
  });
 
class PetCard extends Component {

handleClick = (property) => {
    this.props.history.push(property); 
}

    render(){
        let content = null; 
     if(this.props.pet.species_id === 2 && this.props.user.userName){
         content = (
        <div className="card">
            <CardActionArea>
                <img src={this.props.pet.image_path} alt="pet"/>
                <CardContent>
                <Typography gutterBottom variant="headline" component="h2">test{this.props.pet.name}</Typography>
                </CardContent>
            </CardActionArea>
                <CardActionArea>
                    <Typography gutterBottom variant="body1">Last walked: 9/19/18 at 8:00am</Typography>
                     <Button onClick={()=> this.handleClick('walkreport')} variant="contained" color="primary">Walked</Button>
                    <Typography gutterBottom variant="body1">Last fed: 9/19/18 at 8:00am </Typography>
                    <Button onClick={()=> this.handleClick('fedreport')} variant="contained" color="primary">Fed</Button>
                    <Typography gutterBottom variant="body1">Medications last given: 9/19/18 at 8:00am</Typography>
                    <Button onClick={()=> this.handleClick('medicationreport')} variant="contained" color="primary">Medications Given</Button>
                </CardActionArea>
                </div>
         );
     } else if (this.props.pet.species_id === 1 && this.props.user.userName){
        content = (
        <div className="card">
           <CardActionArea>
               <img src={this.props.pet.image_path} alt="pet"/>
               <CardContent>
               <Typography gutterBottom variant="headline" component="h2">{this.props.pet.name}</Typography>
               </CardContent>
           </CardActionArea>
               <CardActionArea>
                   <Typography gutterBottom variant="body1">Litterbox last changed: 9/19/18 at 8:00am</Typography>
                    <Button onClick={()=> this.handleClick('litterboxreport')} variant="contained" color="primary">Litterbox Changed</Button>
                   <Typography gutterBottom variant="body1">Last fed: 9/19/18 at 8:00am </Typography>
                   <Button onClick={()=> this.handleClick('fedreport')} variant="contained" color="primary">Fed</Button>
                   <Typography gutterBottom variant="body1">Medications last given: 9/19/18 at 8:00am</Typography>
                   <Button onClick={()=> this.handleClick('medicationreport')} variant="contained" color="primary">Medications Given</Button>
               </CardActionArea>
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