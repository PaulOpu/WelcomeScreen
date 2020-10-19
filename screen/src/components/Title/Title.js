import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';

/**
 * This is a reusable title for the tiles in a grid or a AppBar.
 */
class Title extends Component {

  render(){
    return (
      <Typography component="h2" variant="h6" color="primary" gutterBottom>
        {this.props.children}
      </Typography>
    );
  }
  
}

Title.propTypes = {
  /** The node that should be displayed as a title. */
  children: PropTypes.node,
};

export default Title;