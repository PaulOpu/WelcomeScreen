import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import moment from 'moment-timezone';

// Constants
import * as Parser from "../../services/handler/parser";

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
  cardRoot: {
    minWidth: 275,
  },
  title: {
    fontSize: 14,
    flexGrow: 1,
  },
  pos: {
    marginBottom: 12,
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  appBar: {
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
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
 * This component renders the calendar view of the dashboard
 * TODO: Exclude the jsx code of each calendar event into a separate file
 * TODO: Change color of avatar to "primary" and "secondary" color
 */
class Calendar extends Component {
    constructor(props){
      super();
    }

  
    render(){
        const { classes, content } = this.props;
        const title = "".concat("Upcoming Events for Today the ",moment().format("Do MMMM YYYY"));
        return (
            <div className={classes.root}>
            <Header title={title}/>
            <main className={classes.content}>
                <div className={classes.appBarSpacer} />
                <Container maxWidth="lg" className={classes.container}>
                <Grid container spacing={3}>
                  {(content.length == 0)?
                  // Show empty events paper
                    <Grid item xs={12}>
                      <Paper className={classes.paper}>
                          <Typography component="h1" variant="h6" color="inherit" style={{textAlign:"center"}}>
                              There no upcoming events planned for today.
                          </Typography>
                      </Paper>
                    </Grid>
                  :
                  // Display each event of the calendar
                  content.map((item,index) => {
                    const locationTime = item["location"].concat("  (",Parser.formatDuration(item["startTime"],item["endTime"]),")");
                    const isLateBool = Parser.isLate(item["startTime"]);
                    const avatarColor = isLateBool ? "red" : "blue";
                    const timeToStartColor = isLateBool ? "secondary" : "primary";
                    return (
                    <Grid item xs={12} key={index}>
                    <Card className={classes.cardRoot}>
                      <CardHeader
                        avatar={
                          <Avatar aria-label="event" style={{backgroundColor: avatarColor}}>
                            {item["location"][0]}
                          </Avatar>
                        }
                        title={
                          <Typography variant="h5" component="h5">
                            {item["subject"]}
                        </Typography>
                        }
                        subheader={
                          <div>
                            <Typography variant="body1" component="h2">
                              {locationTime}
                            </Typography>
                            <Typography variant="body2" component="h5" color={timeToStartColor}>
                              {Parser.getTimetoStart(item["startTime"])}
                            </Typography>
                          </div>
                        }
                        />
                    </Card>
                    
                    </Grid>
                    );
                  })}
                </Grid>
                <Box pt={4}>
                    <Copyright />
                </Box>
                </Container>
            </main>
            </div>
    
    );};
};

Calendar.propTypes = {
  /** calendar entries */
  content: PropTypes.array.isRequired,
};


export default withStyles(styles)(Calendar);
