import React from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import axios from 'axios';

const Nav = () => {
  const activeNavLink = {
    color: 'white',
  };

  const history = useHistory();

  const logout = (e) => {
    e.preventDefault();

    axios.post('/api/auth/logout')
      .then(() => {
        localStorage.setItem('isLogined', 'false');
        history.push('/login');
      })
      .catch(error => history.push('/home'));
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <a className="navbar-brand" href="/">Hafamily</a>
      <button className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"/>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          <li className="nav-item">
            <NavLink activeStyle={activeNavLink} className="nav-link" to="/video/drama">
              Drama
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink activeStyle={activeNavLink} className="nav-link" to="/video/movie">
              Movie
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink activeStyle={activeNavLink} className="nav-link" to="/video/lecture">
              Lecture
            </NavLink>
          </li>
        </ul>
      </div>
      <a className="nav-link mr-3 text-white" href="#" onClick={logout}>Logout</a>
    </nav>
  );
};

export default Nav;
