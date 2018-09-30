import React, { Component } from 'react';
import {Typography, List, ListItem} from '@material-ui/core';
import moment from 'moment'; 
import './Reports.css'; 

class ReportingTableComponent extends Component {
    render() {
        let content = null;
        if (this.props.activityID === '1') {
          content = (
            <div>
              <List className="reports-list">
            {this.props.activityData.map((activity, i) => {
                 return(
                 <ListItem key={i}><Typography>{activity.type} by {activity.owner_name}  on {moment(activity.date).format('MMMM Do YYYY')} at {activity.time}.</Typography></ListItem>
                );
             })}
             </List>
            </div>
          );
        } else if (this.props.activityID === '3'){
            content = (
              <div>
                <List className="reports-list">
             {this.props.activityData.map((activity, i) => {
                 return(
                 <ListItem key={i}>
               <Typography>{activity.type} changed by {activity.owner_name}  on {moment(activity.date).format('MMMM Do YYYY')} at {activity.time}.</Typography> 
                </ListItem>
                    );
                 })}
                 </List>
              </div>
            );
          } else if (this.props.activityID === '2'){
            content = (
              <div>
                <List className="reports-list">
               {this.props.activityData.map((activity, i) => {
                   return(
                 <ListItem key={i}>
               <Typography>{activity.type} by {activity.owner_name}  on {moment(activity.date).format('MMMM Do YYYY')}.</Typography> 
                <Typography>Pooped?: {activity.poop_check}</Typography>
                <Typography>Notes: {activity.notes}</Typography>
                </ListItem>
                );
                 })}
                 </List>
              </div>
            );
          } else if (this.props.activityID === '4'){
            content = (
              <div>
                <List className="reports-list">
               {this.props.activityData.map((activity, i) => {
                   return(
                 <ListItem key={i}>
               <Typography>{activity.medication_name} given by {activity.owner_name}  on {moment(activity.date).format('MMMM Do YYYY')} at {activity.time}.</Typography> 
                <Typography>Notes: {activity.notes}</Typography>
                </ListItem>
                );
                 })}
                 </List>
              </div>
            );
          }
        return (
          <div>
            { content }
          </div>
        );
      }
    }
    
export default ReportingTableComponent; 