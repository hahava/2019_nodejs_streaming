import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import commonUtil from './common/commonUtil';

const Login = lazy(() => import('./components/Login'));
const Error = lazy(() => import('./components/Error'));
const Videos = lazy(() => import('./components/Videos'));
const Home = lazy(() => import('./components/Home'));
const Player = lazy(() => import('./components/Player'));

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
        <Suspense fallback={<div>Loading...</div>}>
          <Switch>
            <PrivateRoute path={['/index', '/']} exact component={Home} />
            <PrivateRoute path="/video/:type" exact component={Videos} />
            <PrivateRoute path="/video/:type/player/:fileName" exact component={Player} />
            <Route path="/login" exact component={Login} />
            <Route component={Error} />
          </Switch>
        </Suspense>
      </BrowserRouter>
    </div>
  );
}

export default App;
