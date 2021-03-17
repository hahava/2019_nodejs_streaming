import React from 'react';
import { Link } from 'react-router-dom';

const Nav = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <a className="navbar-brand" href="/">Hafamily</a>
      <button className="navbar-toggler" type="button" data-toggle="collapse"
              data-target="#navbarNav"
              aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link className="nav-link" to="/video/drama">Drama</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/video/movie">Movie</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/video/lecture">Lecture</Link>
          </li>
        </ul>
      </div>
      <a className="nav-link mr-3 text-white" href="/logout">Logout</a>
    </nav>
  );
};

export default Nav;
