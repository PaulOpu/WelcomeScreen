import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import MuiContainer from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import Button from '@material-ui/core/Button';
import Radio from '@material-ui/core/Radio';

import TextField from '@material-ui/core/TextField';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';


// api
import APIServices from '../../services/client/api';

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


function array_move(arr, old_index, new_index) {
    if (new_index >= arr.length) {
        var k = new_index - arr.length + 1;
        while (k--) {
            arr.push(undefined);
        }
    }
    arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
    return arr; // for testing
};

const styles = theme => ({
    root:{
        display: "flex",
    },
    cardRoot: {
        minWidth: 275,
        maxWidth: 500,
        margin: theme.spacing(3),
    },
    toolbar: {
        paddingRight: 24, // keep right padding when drawer closed
    },
    toolbarIcon: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar,
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
        }),
    },
    menuButton: {
        marginRight: 36,
    },
    menuButtonHidden: {
        display: 'none',
    },
    title: {
        flexGrow: 1,
    },
    drawerPaperClose: {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
        width: theme.spacing(9),
        },
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
        margin: theme.spacing(1),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
    },
    fixedHeight: {
        height: 240,
    },
    pos: {
        marginBottom: 12,
      },
});

const default_content = {
    "type":"calendar",
    "content":[],
    "duration":5
};
/**
 * This component renders the playlist view for the administration
 * TODO: Make everything draggable 
 * TODO: Implement toast to see if submission was succesfull 
 */
class Playlist extends Component {
    constructor(props) {
        super();
        
        this.state = {
          playlist:[],
          indices:[]
        };

        this.handleChange = this.handleChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.loadPlaylist = this.loadPlaylist.bind(this);
        this.onDelete = this.onDelete.bind(this);
        this.onAdd = this.onAdd.bind(this);
        this.onMove = this.onMove.bind(this);
        this.onClear = this.onClear.bind(this);
    } 
    componentDidMount(){
        this.loadPlaylist();
    }
   /**
     * Load the playlist from the backend
     *
     * @public
     */
    loadPlaylist(){
        APIServices.getPlaylist().then(playlist => {
            playlist = playlist.map((entry, index) => {
                entry["index"] = index;
                return entry
            })
            
            this.setState({
                playlist:playlist,
                indices:[...Array(playlist.length).keys()]});

            
        });
        
    }
   /**
     * Triggers the Delete Event
     *
     * @param {index} integer 
     * @public
     */
    onDelete(index){
        let { playlist } = this.state;
        playlist.splice(index,1);
        this.setState({playlist:playlist});
    }
   /**
     * Triggers the Add Event
     *
     * @param {index} integer 
     * @public
     */
    onAdd(index){
        let { playlist, indices } = this.state;
        const new_index = Math.max(...indices)+1;
        const new_content = {
            "type":"calendar",
            "content":[],
            "duration":5,
            "index":new_index
        };

        playlist.splice(index+1, 0, new_content);
        const new_playlist = playlist;
        const new_indices = indices.concat(new_index);
        this.setState(
            {
                playlist:new_playlist,
                indices:new_indices
            });

    }
   /**
     * Triggers the Move Event
     *
     * @param {index} integer 
     * @param {direction} integer 
     * @public
     */
    onMove(index,direction){
        let { playlist } = this.state;
        const new_index = index + direction;
        if(new_index < playlist.length && new_index >= 0){
            playlist = array_move(playlist,index,new_index);
            this.setState({playlist:playlist});
        }
        
    }

   /**
     * Write in State if Textfield changes
     *
     * @param {e} event 
     * @public
     */
    handleChange(e){
        let playlist = this.state.playlist;
        const field = e.target;

        const id_name = field.name.split(",");
        const id = id_name[0];
        const name = id_name[1];
        playlist[id][name] = field.value;
        this.setState({playlist:playlist});

        
    }

   /**
     * Send the new playlist to the backend
     * @public
     */
    onSubmit(){
        const playlist = this.state.playlist.map(entry => {
            if(entry["type"] == "calendar"){
                entry["content"] = [];
                return entry;
            }else{
                return entry;
            }
        })
        APIServices.setContent(playlist);
    }
   /**
     * Clears all entries in the loaded playlist
     *
     * @public
     */
    onClear(){
        this.setState({playlist:[]});
    }
    

    render() {
        const { playlist, indices } = this.state;
        const { classes } = this.props;

        console.log(playlist,indices);

        return (

            <div className={classes.root}>
                <Header title={"Playlist"}/>
                <main className={classes.content}>
                <div className={classes.appBarSpacer} />
                <MuiContainer maxWidth="lg" className={classes.container}>
                    <Button className={classes.cardRoot} variant="contained" color="secondary" onClick={this.onClear}>Clear Playlist</Button>
                    <br></br>
                    <Button onClick={() => {this.onAdd(-1)}} size="small">Add</Button>
                    {playlist.map((item, index) => {
                        //List each playlist element with a form component
                        //TODO: Exclude in separate file, as it got very big
                        const id_str = index.toString()
                        return (
                            <div key={item.index}>
                            <Card className={classes.cardRoot} variant="outlined">
                                <CardContent>
                                    <RadioGroup row name="type" value={item.type} onChange={this.handleChange}>
                                        <FormControlLabel value="calendar" control={<Radio name={id_str.concat(",type")}/>} label="Calendar" />
                                        <FormControlLabel value="video" control={<Radio name={id_str.concat(",type")}/>} label="Video" />
                                        <FormControlLabel value="text" control={<Radio name={id_str.concat(",type")} />} label="Text" />
                                        <FormControlLabel value="picture" control={<Radio name={id_str.concat(",type")}/>} label="Picture" />
                                    </RadioGroup>
                                    <Grid container spacing={3}>
                                        <Grid item xs={12}>
                                            <TextField 
                                                name={id_str.concat(",content")}
                                                label={"Content"} 
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                                onChange={this.handleChange}
                                                defaultValue={item.content}/>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <TextField 
                                                name={id_str.concat(",duration")}
                                                label={"Duration in s"} 
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                                onChange={this.handleChange}
                                                defaultValue={item.duration}/>
                                        </Grid>
                                    </Grid>
                                </CardContent>
                                <CardActions>
                                    <Button onClick={() => {this.onDelete(index)}} size="small">Delete</Button>
                                    <Button onClick={() => {this.onMove(index,1)}} size="small">Move Up</Button>
                                    <Button onClick={() => {this.onMove(index,-1)}} size="small">Move Down</Button>
                                </CardActions>
                            </Card>
                            <Button onClick={() => {this.onAdd(index)}} size="small">Add</Button>
                            </div>
                        );
                    })}
                    <br></br>
                    <Button className={classes.cardRoot} variant="contained" color="primary" onClick={this.onSubmit}>Submit</Button>
                    
                    <Box pt={4}>
                        <Copyright />
                    </Box>
                </MuiContainer>
                </main>
                
            </div>
        );
    }
    
}


export default withStyles(styles)(Playlist);
