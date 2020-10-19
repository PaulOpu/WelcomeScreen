import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import Dashboard from '../Dashboard/Dashboard';
import Playlist from '../Playlist/Playlist';
/**
 * Component to route to playlist and dashboard
 */
export default function App() {
  return (
    <Router>
        <Switch>
          <Route path="/playlist">
            <Playlist />
          </Route>
          <Route path="/dashboard">
            <Dashboard />
          </Route>
        </Switch>
    </Router>
  );
}
