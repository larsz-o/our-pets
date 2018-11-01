import React, { Component } from 'react';
import {Typography, Grid} from '@material-ui/core';
import Nav from '../Nav/Nav.js';

class About extends Component {
    render(){
        return(
        <div>
            <Nav/>
            <Grid container spacing={24}>
            <Grid item xs={3}>
                <Typography variant="display1">
                Our Pets helps people communicate about daily pet care. 
                </Typography>
            </Grid>
            <Grid item xs={9}>
            <img src="https://cdn.filestackcontent.com/PBd6cjXvRZSxW7KTeIgl" alt="Reed begging"/>
            </Grid>
            <Typography>
                Our Pets simplifies communication between co-pet owners, and between pet owners and secondary pet caregivers, such as pet sitters or friends and family who may check on your pets for you.
                Users can opt-in to text message notifications for each time a pet in their household has been fed, walked, given medications, or had their litterbox changed. Users can also communicate with each other through Our Pets' mail system. We love this feature so that pet sitters can share updates and photos with pet owners without interrupting a vacation. Pet owners can login to check in about how their pets are doing at their convenience. 
            </Typography>
            </Grid>
            
        </div>
        );
    }
}
export default About;