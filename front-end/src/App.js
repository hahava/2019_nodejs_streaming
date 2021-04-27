import './App.css';
import Login from './components/Login';
import React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import Error from './components/Error';
import Videos from './components/Videos';
import Home from './components/Home';
import commonUtil from './common/commonUtil';
import Player from './components/Player';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <PrivateRoute path={['/index', '/']} exact={true} component={Home}/>
          <PrivateRoute path="/video/:type" exact={true} component={Videos}/>
          <PrivateRoute path="/video/:type/player/:fileName" exact={true} component={Player}/>
          <Route path={'/login'} exact={true} component={Login}/>
          <Route component={Error}/>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    commonUtil.auth.isLogined()
      ? <Component {...props} />
      : <Redirect to='/login'/>
  )}/>
);
export default App;
