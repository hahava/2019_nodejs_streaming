import React from 'react';
import Nav from './Nav';

const Videos = ({ match }) => {
  const { type } = match.params;
  return (
    <>
      <Nav></Nav>
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
    </>
  );
};

export default Videos;
