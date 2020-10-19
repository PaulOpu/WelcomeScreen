import React, { Component } from 'react';
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TablePagination from '@material-ui/core/TablePagination';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import ListItem from '@material-ui/core/ListItem';

import * as Parser from "../../services/handler/parser";


const styles = theme => ({
    root: {
        maxWidth: 345,
      },
      media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
      },
      expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
          duration: theme.transitions.duration.shortest,
        }),
      },
      expandOpen: {
        transform: 'rotate(180deg)',
      },
      avatar: {
        backgroundColor: red[500],
      },
});
/**
 * This table enhances the normal material-ui table with pagination.
 * For the future, the [material-table](https://github.com/mbrn/material-table)
 * is a good start for a table with many functions.
 */
class EnhancedTable extends Component {
    constructor(props){
        super();
    }


    render(){
      /* ... */
      const { classes, data } = this.props;

      return (
        <Card className={classes.root}>
            <CardHeader
            avatar={
                <Avatar aria-label="recipe" className={classes.avatar}>
                R
                </Avatar>
            }
            title="Shrimp and Chorizo Paella"
            subheader="September 14, 2016"
            />
            <CardContent>
            <Typography variant="body2" color="textSecondary" component="p">
                This impressive paella is a perfect party dish and a fun meal to cook together with your
                guests. Add 1 cup of frozen peas along with the mussels, if you like.
            </Typography>
            </CardContent>
        </Card>
        );
    }
}

CalendarItem.propTypes = {
  /** calendar data */
  data: PropTypes.object.isRequired,
};


export default withStyles(styles)(CalendarItem);