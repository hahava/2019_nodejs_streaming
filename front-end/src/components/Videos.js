import React, { useEffect, useState } from 'react';
import Nav from './Nav';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Videos = ({ match }) => {
  const { type } = match.params;

  const [fileNames, setFileNames] = useState([]);

  useEffect(() => {
    axios.get(`/api/video/${type}`)
      .then((result) => {
        setFileNames(result.data);
      });
  }, [type]);

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
          {
            fileNames.map((file, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>
                  <Link to={`/video/player/${file}`}>
                    {file}
                  </Link>
                </td>
              </tr>
            ))
          }
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Videos;
