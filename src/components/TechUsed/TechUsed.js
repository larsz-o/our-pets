import React, { Component } from 'react';
import {List, ListItem, Typography, Dialog, DialogTitle, DialogContent, DialogContentText} from '@material-ui/core'; 

class TechUsed extends Component {
    constructor(props){
        super(props);
        this.state = {
            open: false,
        }
    }
    handleOpen = () => {
        this.setState({
            open: true
        });
    }
    handleClose = () => {
        this.setState({
            open: false
        });
    }
        render(){
        return(
            <div>
                <Typography variant="headline" onClick={this.handleOpen}>Technologies Used</Typography>
                <List>
                    <ListItem>React</ListItem>
                    <ListItem>Redux</ListItem>
                    <ListItem>Sagas</ListItem>
                    <ListItem>PostgreSQL</ListItem>
                    <ListItem>Node</ListItem>
                    <ListItem>Express</ListItem>
                    <ListItem>Twilio (text message alerts)</ListItem>
                    <ListItem>FileStack (image uploads)</ListItem>
                    <ListItem>Material UI</ListItem>
                    <ListItem>Passport</ListItem>
                    <ListItem>SweetAlert</ListItem>
                </List>
                <Dialog 
                open={this.state.open}
                onClose={this.handleClose}
                aria-labelledby="thanks-title">
                    <DialogTitle id="thanks-title">Thanks!</DialogTitle>
                    <DialogContent>
                    <DialogContentText>Thanks to everyone in Polaris and to Chris, Kris, Mary, and Dane for all your help!</DialogContentText>
                    </DialogContent>
                </Dialog>
            </div>
        );
    }
}
export default TechUsed; 