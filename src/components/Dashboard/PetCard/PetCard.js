import React, {Component} from 'react'; 
import {connect} from 'react-redux'; 
import {Button, Typography, CardActionArea, CardContent, Card} from '@material-ui/core'; 

const mapStateToProps = state => ({
    user: state.user,
  });
  // this information will come via mapping through an array of pets retreived from the server in the dashboard
class PetCard extends Component {
    render(){
        let content = null; 
     if(this.props.pet.species_id === 2 && this.props.user.userName){
         content = (
        <div className="card">
        <Card>
            <CardActionArea>
                <img src={this.props.pet.image_path} alt="pet"/>
                <CardContent>
                <Typography gutterBottom variant="headline" component="h2">test{this.props.pet.name}</Typography>
                </CardContent>
            </CardActionArea>
                <CardActionArea>
                    <Typography gutterBottom variant="body1">Last walked: 9/19/18 at 8:00am</Typography>
                     <Button variant="contained" color="primary">Walked</Button>
                    <Typography gutterBottom variant="body1">Last fed: 9/19/18 at 8:00am </Typography>
                    <Button variant="contained" color="primary">Fed</Button>
                </CardActionArea>
            </Card>
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
               {/* these will need logic, too */}
               <CardActionArea>
                   <Typography gutterBottom variant="body1">Litterbox last changed: 9/19/18 at 8:00am</Typography>
                    <Button variant="contained" color="primary">Litterbox Changed</Button>
                   <Typography gutterBottom variant="body1">Last fed: 9/19/18 at 8:00am </Typography>
                   <Button variant="contained" color="primary">Fed</Button>
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