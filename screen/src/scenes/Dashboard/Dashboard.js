import React, { Component } from 'react';
import './Dashboard.css';
import { withStyles } from '@material-ui/core/styles';

// material-ui
import Calendar from '../Calendar/Calendar';
import Video from '../Video/Video';
import Text from '../Text/Text';
import Image from '../Image/Image';

// api
import APIServices from '../../services/client/api';

const styles = theme => ({
})

/**
 * This component iterates through the playlist and shows the corresponding content
 */
class Dashboard extends Component {
  constructor(props){
    super();
  
    this.state = {
      data: null,
      currID: 0,
    }
  }
  /**
     * Get the full content (playlist + calendar events)
     *
     * @public
     */
  getContent(){
    return APIServices.getContent()
    .then(data =>{
      this.setState({data:data});
    });
    
  }

  componentDidMount() {
    //Start the carousel
    this.getContent().then(() => {
      const { data, currID } = this.state;

      const duration = data[currID%data.length]["duration"];

      this.timeoutID = setTimeout(
        () => this.nextContent(),
        duration*1000
      ); 
    });

    
    
  }
  /**
   * Change the component after the specified number of seconds
   *
   * @public
   */
  nextContent() {
    const { data, currID } = this.state;
    console.log(currID);
    const duration = data[currID%data.length]["duration"];
    
    this.timeoutID = setTimeout(
      () => {
        const nextID = currID + 1
        this.setState({
          currID: nextID%data.length
        });
        if(nextID == data.length){
          this.getContent();
        }
        this.nextContent()
      },
      duration*1000
    ); 

    
  }
  
  render(){

    const { data, currID } = this.state;
    const { classes } = this.props;

    if(data){
      const currContent = data[currID%data.length];
      console.log(currContent);
      const currComponent = (function(content){
        switch(content.type){
          
          case "calendar":
            return <Calendar id={content.index} content={content.content}/>;
            
          case "video":
            return <Video id={content.index} content={content.content}/>;
            
          case "text":
            return <Text id={content.index} content={content.content}/>;

          case "picture":
            return <Image id={content.index} content={content.content}/>;
            
        } 
      })(currContent);



      return(
        <div className="Dashboard">
          {currComponent}
        </div>
      );
    }else{
      return (<div></div>);
    }
    
  }
  
}
export default withStyles(styles)(Dashboard);
