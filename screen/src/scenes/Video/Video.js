import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import ReactPlayer from 'react-player';
import screenfull from 'screenfull';


// Constants
import * as Constants from "../../services/handler/constants";

const playerWidth = "100%";
const playerHeight= "100%";

const styles = theme => ({
});
/**
 * The dashboard gives the first impression from the react app.
 * Here, keyfigures and other visualization can be shown.
 * For the moment, it just includes the Matches table.
 */
class Video extends Component {
    constructor(props){
        super();

    }
    
    render(){
        const { classes, content } = this.props;
         
        return (
            <ReactPlayer 
                id="react-player"
                url={content} 
                playing={true} 
                loop={true} 
                muted={true} 
                width={playerWidth}
                height={playerHeight}
            />

    
    );};
};

Video.propTypes = {
  /** calendar entries */
  content: PropTypes.string.isRequired,
};


export default withStyles(styles)(Video);
