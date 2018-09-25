import React, { Component } from 'react';
import {Table, TableHead, TableBody, TableRow, TableCell} from '@material-ui/core';
import moment from 'moment'; 

class ReportingTableComponent extends Component {
    render(){
        let content = null; 
        if(this.props.activityData.activity_id === 1 || this.props.activityData.activity_id === 3){
        content =(
                <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Pet Name</TableCell>
                    <TableCell>Activity</TableCell>
                    <TableCell>Date</TableCell>
                    <TableCell>Time</TableCell>
                    <TableCell>Owner</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                    {this.props.activityData.map((activity, i) => {
                        return(
                        <TableRow key={i}>
                        <TableCell>{activity.pet_name}</TableCell>
                        <TableCell>{activity.type}</TableCell>
                        <TableCell>{moment(activity.date).format('MM-DD-YYYY')}</TableCell>
                        <TableCell>{activity.time}</TableCell>
                        <TableCell>{activity.owner_name}</TableCell>
                        </TableRow>
                        );
                    })}
                </TableBody>
              </Table>
            );
        } else if (this.props.activity_id === 2){
            content =(
                <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Pet Name</TableCell>
                    <TableCell>Activity</TableCell>
                    <TableCell>Date</TableCell>
                    <TableCell>Time Start</TableCell>
                    <TableCell>Time End</TableCell>
                    <TableCell>Poop Check</TableCell>
                    <TableCell>Notes</TableCell>
                    <TableCell>Owner</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                    {this.props.activityData.map((activity, i) => {
                        return(
                    <TableRow key={i}>
                        <TableCell>{activity.pet_name}</TableCell>
                        <TableCell>{activity.type}</TableCell>
                        <TableCell>{moment(activity.date).format('MM-DD-YYYY')}</TableCell>
                        <TableCell>{activity.time_start}</TableCell>
                        <TableCell>{activity.time_end}</TableCell>
                        <TableCell>{activity.poop_check}</TableCell>
                        <TableCell>{activity.notes}</TableCell>
                        <TableCell>{activity.owner_name}</TableCell>
                    </TableRow>
                        );
                    })}
                </TableBody>
              </Table>
            );
    } else if (this.props.activity_id === 4){
    content =(
        <Table>
        <TableHead>
          <TableRow>
            <TableCell>Pet Name</TableCell>
            <TableCell>Activity</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Time</TableCell>
            <TableCell>Medication</TableCell>
            <TableCell>Notes</TableCell>
            <TableCell>Owner</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {this.props.activityData.map((activity, i) => {
                        return(
                    <TableRow key={i}>
                        <TableCell>{activity.pet_name}</TableCell>
                        <TableCell>{activity.type}</TableCell>
                        <TableCell>{moment(activity.date).format('MM-DD-YYYY')}</TableCell>
                        <TableCell>{activity.time_start}</TableCell>
                        <TableCell>{activity.time_end}</TableCell>
                        <TableCell>{activity.poop_check}</TableCell>
                        <TableCell>{activity.notes}</TableCell>
                        <TableCell>{activity.owner_name}</TableCell>
                    </TableRow>
                        );
                    })}
        </TableBody>
      </Table>
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