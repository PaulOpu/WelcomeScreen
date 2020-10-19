import React, { Component } from "react";
import clsx from 'clsx';
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import { Image } from 'react-fullscreen-image';


// Constants
import * as Constants from "../../services/handler/constants";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://www.linkedin.com/in/paul-opuchlich-484a85136/">
        Paul Opuchlich
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const styles = theme => ({

});
/**
 * 
 */
class FullImage extends Component {
    constructor(props){
        super();

    }

  
    render(){
        const { classes, content } = this.props;

        return (
          <Image
              src={content}
              alt="nature"
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                height: '100%',
                width: '100%',
                objectFit: 'cover',
              }}
            />

        );
    };
};

FullImage.propTypes = {
  /** image url */
  content: PropTypes.string.isRequired,
};


export default withStyles(styles)(FullImage);
