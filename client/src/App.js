import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

/* Import page components */
import Homepage from './components/pages/Homepage/Homepage';
import Features from './components/pages/Features/Features';
import Faq from './components/pages/FAQ/Faq';
import UserAchievements from './components/pages/UserAchievements/UserAchievements';
import GameAchievementList from './components/pages/GameAchievementList/GameAchievementList';

/* App route configuration */
const App = () =>{
  return(
    <Router>
      <Switch>
        <Route path='/' exact component = {Homepage}/>
        <Route path='/features' exact component = {Features}/>
        <Route path='/faq' exact component = {Faq}/>
        <Route path='/userAchievements' exact component = {UserAchievements}/>
        <Route path='/gameAchievements' exact component = {GameAchievementList}/>
      </Switch>
    </Router>
  )
};

export default App;
