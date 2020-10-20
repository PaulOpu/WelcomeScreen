# WelcomeScreen

This is a welcome screen which shows several possible items on a dashboard and iterates through them after a specified number of seconds.

## Frontend

### Routing

- /App - Routing between "/dashboard" and "/playlist"
  - /Dashboard - Screen that loads the content from the backend and iterates through the following components.
    - /Image - shows a image in full screen (need format 1920x1080).
    - /Video - shows video from URL with auto play in full screen.
    - /Calendar - shows a calendar of the events for today.
    - /Text - Shows a certain welcome text on the screen.
  - /Playlist - Module to display the playlist and interact with it (not that smooth yet and many improvements possible like draggable)

### Helper Functions

-  /scr
    - /components - components that are used frequently
    - /scenes - components that are used once
    - /services - helper functions
        - /handler 
            - /constants - list of constants from the project (TODO: there are still many string that can be moved to this file)
            - /parser - helper functions to parse date into a specific format
        - /client
            - /api - api calls that communicate with the website

## Backend

Requests:

- /content (get) - returns the playlist (saved as a file on the server) filled with the calendar entries
- /set (post) - set the new playlist
- /playlist (get) - returns just the playlist for the administration view
