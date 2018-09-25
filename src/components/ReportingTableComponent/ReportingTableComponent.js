import React, { Component } from 'react';
import {Table, TableHead, TableBody, TableRow, TableCell} from '@material-ui/core';

class ReportingTableComponent extends Component {
    render(){
        if(this.props.activityData.activity_id === 1){
            return(
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
                        <TableCell>{activity.</TableCell>
                        </TableRow>
                    })}
                </TableBody>
              </Table>
            );
        } else if (this.props.activity_id === 2){
            return(
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
        return(
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
    return(
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
}
}
export default ReportingTableComponent; 