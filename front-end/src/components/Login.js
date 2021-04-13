import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

const Login = () => {

  const history = useHistory();

  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');

  const onUserIdChange = e => setUserId(e.target.value);
  const onUserPwChange = e => setPassword(e.target.value);

  const submit = (e) => {
    e.preventDefault();

    axios.post('/api/auth/login', {
      userId,
      password,
    })
      .then(() => {
        localStorage.setItem('isLogined', 'true');
        history.push('/');
      })
      .catch((error) => {
        alert(error.response.message);
      });
  };

  useEffect(() => {
    if (localStorage.getItem('isLogined') === 'true') {
      history.push('/');
    }
  });

  return (
    <div className="container">
      <div className="row justify-content-center align-items-center" style={{ height: '100vh' }}>
        <div className="col-4">
          <div className="card">
            <div className="card-header">
              Hafamily Login
            </div>
            <div className="card-body">
              <form autoComplete="off">
                <div className="form-group">
                  <label htmlFor="username" className="float-left">User ID</label>
                  <input id="username"
                         className="form-control"
                         type="text"
                         name="username"
                         onChange={onUserIdChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="password" className="float-left">User PW</label>
                  <input id="password"
                         type="password"
                         className="form-control"
                         name="password"
                         onChange={onUserPwChange}
                  />
                </div>
                <div className="float-right">
                  <button id="sendlogin"
                          className="btn btn-primary"
                          onClick={submit}
                  >
                    login
                  </button>
                </div>
              </form>
            </div>
          </div>
          <br/>
        </div>
      </div>
    </div>
  );
};

export default Login;

