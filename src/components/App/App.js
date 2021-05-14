import { Router } from 'express';
import React from 'react';
import favoriteView from './favoriteView/favoriteView';
import searchView from './searchView/searchView';
import { HashRouter as Router, Route } from "react-router-dom";

function App(props) {
  return (
    <div>
      <Router>
        <Route path='/' exact>
          <searchView />
        </Route>
        <Route path='/favoriteView'>
          <favoriteView />
        </Route>
      </Router>
    </div>
  );
}

export default App;


