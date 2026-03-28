import React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import Login from './components/Login';
import Error from './components/Error';
import Videos from './components/Videos';
import Home from './components/Home';
import Player from './components/Player';
import commonUtil from './common/commonUtil';

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) => (
      commonUtil.auth.isLogined() ? <Component {...props} /> : <Redirect to="/login" />
    )}
  />
);

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <PrivateRoute path={['/index', '/']} exact component={Home} />
          <PrivateRoute path="/video/:type" exact component={Videos} />
          <PrivateRoute path="/video/:type/player/:fileName" exact component={Player} />
          <Route path="/login" exact component={Login} />
          <Route component={Error} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
