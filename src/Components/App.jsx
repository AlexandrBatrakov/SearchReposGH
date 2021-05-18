import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './app.scss';
import { Redirect, Route, Switch } from 'react-router-dom';
import Main from './main/Main';
import Card from './card/Card';
import Error from './main/repo/Error';


function App() {

  const dispatch = useDispatch();

  return (
    <div className="container">
      <Switch>
        <Route exact path="/" component={Main} />
        <Route path="/card/:username/:reponame" component={Card} />
        <Route path="/error" component={Error} />
        <Redirect to="/"/>
      </Switch>
    </div>
  )
}

export default App;
