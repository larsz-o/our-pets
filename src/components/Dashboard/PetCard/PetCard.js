import React, {Component} from 'react'; 
import {connect} from 'react-redux'; 
import {Button, Typography, CardActionArea, CardContent} from '@material-ui/core'; 


const mapStateToProps = state => ({
    user: state.user,
  });
  // this information will come via mapping through an array of pets retreived from the server in the dashboard
class PetCard extends Component {
    render(){
        return(
            <div>
            <div className="card">
            <CardActionArea>
                <img src="https://pbs.twimg.com/profile_images/756320100483858432/OX50XkO__400x400.jpg" alt="kitten"/>
                <CardContent>
                <Typography gutterBottom variant="headline" component="h2">Your Pet's Name</Typography>
                </CardContent>
            </CardActionArea>
                {/* these will need logic, too */}
                <CardActionArea>
                     <Typography gutterBottom variant="body1">Last walked: 9/19/18 at 8:00am</Typography>
                     <Button variant="contained" color="primary">Walked</Button>
                    <Typography gutterBottom variant="body1">Last fed: 9/19/18 at 8:00am </Typography>
                    <Button variant="contained" color="primary">Fed</Button>
                </CardActionArea>
                </div>
            </div>
        );
    }
}

export default connect(mapStateToProps)(PetCard); 