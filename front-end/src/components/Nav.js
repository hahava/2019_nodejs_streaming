import React from 'react';

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
            <a className="nav-link" href="/video/drama">Drama</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/video/movie">Movie</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/video/lecture">Lecture</a>
          </li>
        </ul>
      </div>
      <a className="nav-link mr-3 text-white" href="/logout">Logout</a>
    </nav>
  );
};

export default Nav;
