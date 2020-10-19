import { GET_CONTENT_URL, SET_CONTENT_URL, GET_PLAYLIST_URL } from "../handler/constants";
import axios from "axios";

/**
 * Connection class to the API. The functionalities can be separated if the complexity increases.
 */
class APIServices {

    /**
    * Get the content from the backend
    *
    * @public
    */
    getContent() {
        let content = fetch(GET_CONTENT_URL).then(response => response.json())
        .then(data =>{
            return data.data;
        });
        console.log(content);
        return content;
    }

    /**
     * Set the Content in the backend
     *
     * @param {content} json 
     * @public
     */
    setContent(content) {
        //const data = JSON.stringify({"data":content});

        const header = {
            'Content-Type': 'application/json'
        };

        axios.post(SET_CONTENT_URL, {"list":content}, {"header":header});
    }
    /**
     * Get just the playlist without calendar entries
     *
     * @public
     */
    getPlaylist(){
        return fetch(GET_PLAYLIST_URL).then(response => response.json())
        .then(data =>{
            return data.data;
        });
    }
  
}

export default new APIServices();