import React from 'react';
import FavoriteView from '../favoriteView/favoriteView';
import SearchView from '../searchView/searchView';
import { HashRouter as Router, Route } from "react-router-dom";

function App() {
  return (
    <div>
      <Router>
        <Route path='/' exact>
          <SearchView />
        </Route>
        <Route path='/favoriteView'>
          <FavoriteView />
        </Route>
      </Router>
    </div>
  );
}

export default App;


