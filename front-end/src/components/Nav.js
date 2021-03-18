import React from 'react';
import { NavLink } from 'react-router-dom';

const Nav = () => {
  const activeNavLink = {
    color: 'white',
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
      <a className="nav-link mr-3 text-white" href="/logout">Logout</a>
    </nav>
  );
};

export default Nav;