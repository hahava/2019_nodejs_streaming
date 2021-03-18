import React, { useState } from 'react';

const Login = () => {

  const [userId, setUserId] = useState('');
  const [userPw, setUserPw] = useState('');

  const onUserIdChange = e => setUserId(e.target.value);
  const onUserPwChange = e => setUserPw(e.target.value);

  const submit = (e) => {
    e.preventDefault();
  };

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
                  <label htmlFor="userpassword" className="float-left">User PW</label>
                  <input id="userpassword"
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

