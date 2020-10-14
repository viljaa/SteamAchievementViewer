import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

/* Import page components */
import Homepage from './components/pages/Homepage';

/* App route configuration */
const App = () =>{
  return(
    <Router>
      <Switch>
        <Route path='/' exact component = {Homepage}/>
      </Switch>
    </Router>
  )
};

export default App;
