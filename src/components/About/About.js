import React, { Component } from 'react';
import {Typography, Grid} from '@material-ui/core';

class About extends Component {
    render(){
        return(
            <Grid container spacing={24}>
            <Grid item xs={3}>
                <Typography variant="display1">
                Our Pets helps people communicate about daily pet care. 
                </Typography>
            </Grid>
  
            <Grid item xs={3}>
            <Typography>
                Our Pets was inspired by Reed, a very smart and very food-motivated dog and a significant life change in our family. When Sarah began working the night shift as a nurse, she didn't always have enough energy to leave a note for Lars in the morning that communicated if Reed had been walked or fed before she went to bed. 
                Reed would sometimes trick Lars into thinking he hadn't been fed, by patiently sitting in his spot in the kitchen by his bowl.
         <Grid item xs={3}>
            <img src="https://cdn.filestackcontent.com/PBd6cjXvRZSxW7KTeIgl"/>
         </Grid>
                Our Pets simplifies communication between co-pet owners, and between pet owners and secondary pet caregivers, such as pet sitters or friends and family who may check on your pets for you.
                Users can opt-in to text message notifications for each time a pet in their household has been fed, walked, given medications, or had their litterbox changed. Users can also communicate with each other through Our Pets' mail system. We love this feature so that pet sitters can share updates and photos with pet owners without interrupting a vacation. Pet owners can login to check in about how their pets are doing at their convenience. 
            </Typography>
            </Grid>
            </Grid>
        );
    }
}
export default About;