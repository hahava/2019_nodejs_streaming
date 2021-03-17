import React from 'react';

const Error = () => {
  return (
    <div className="page-wrap d-flex flex-row align-items-center" style={{ marginTop: '200px' }}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-12 text-center">
            <span className="display-1 d-block">404</span>
            <div className="mb-4 lead">The page you are looking for was not found.</div>
            <a href="/index" className="btn btn-link">Back to Home</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Error;
