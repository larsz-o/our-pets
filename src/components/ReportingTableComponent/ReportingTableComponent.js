import React, { Component } from 'react';


class ReportingTableComponent extends Component {
    render(){
        if(this.props.activity_id === 1){
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