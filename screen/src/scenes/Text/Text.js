import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link';

// Constants
import * as Constants from "../../services/handler/constants";

// Own Components
import Header from '../../components/Header/Header';

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
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  title: {
    flexGrow: 1,
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
});
/**
 * Text Component to show a text on the screen
 * TODO: Each Container > Grid Frame can be excluded in a additional file (is used in video, image, ...)
 */
class Text extends Component {
    constructor(props){
        super();
    }

  
    render(){
        const { classes, content } = this.props;

        return (
            <div className={classes.root}>
            <Header title={"Message"}/>
            
            <main className={classes.content}>
                <div className={classes.appBarSpacer} />
                <Container maxWidth="lg" className={classes.container}>
                <Grid container spacing={3}>         
                    <Grid item xs={12}>
                    <Paper className={classes.paper}>
                        <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
                            {content}
                        </Typography>
                    </Paper>
                    </Grid>
                </Grid>
                <Box pt={4}>
                    <Copyright />
                </Box>
                </Container>
            </main>
            </div>
    
    );};
};

Text.propTypes = {
  /** calendar entries */
  content: PropTypes.string.isRequired,
};


export default withStyles(styles)(Text);
