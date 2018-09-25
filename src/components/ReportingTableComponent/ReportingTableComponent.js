import React, { Component } from 'react';
import {Table, TableHead, TableBody, TableRow, TableCell} from '@material-ui/core';
import moment from 'moment'; 

class ReportingTableComponent extends Component {
    render(){
        let content = null; 
        if(this.props.activityData.activity_id === 1){
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
                        <TableRow key={i}>
                        <TableCell>{activity.pet_name}</TableCell>
                        <TableCell>{activity.type}</TableCell>
                        <TableCell>{moment(activity.date).format('MM-DD-YYYY')}</TableCell>
                        <TableCell>{activity.time}</TableCell>
                        <TableCell>{activity.owner_name}</TableCell>
                        </TableRow>
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
        
                  </TableRow>
                </TableHead>
              </Table>
            );
    } else if (this.props.activity_id === 3){
        content =(
            <Table>
            <TableHead>
              <TableRow>
                <TableCell>Pet Name</TableCell>
                <TableCell>Activity</TableCell>
    
              </TableRow>
            </TableHead>
          </Table>
        );
    }  else if (this.props.activity_id === 4){
    content =(
        <Table>
        <TableHead>
          <TableRow>
            <TableCell>Pet Name</TableCell>
            <TableCell>Activity</TableCell>

          </TableRow>
        </TableHead>
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