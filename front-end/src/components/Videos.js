import React from 'react';
import { withRouter } from 'react-router-dom';

const Videos = ({ match }) => {
  const { type } = match.params;

  return (
    <div className="container mt-5">
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <a href="/index">Home</a>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            {type}
          </li>
        </ol>
      </nav>
      <table className="table">
        <thead className="thead-dark ">
        <tr>
          <th width="10%">#</th>
          <th>제목</th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td></td>
          <td>
            <a id="file" href="">
              fileName
            </a>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  );
};

export default withRouter(Videos);
