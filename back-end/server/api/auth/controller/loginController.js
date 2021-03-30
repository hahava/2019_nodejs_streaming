export const register = async (req, res, next) => {
  const { id, password } = req.body;
  console.log(id, password);
  res.send('hello register');
};

export const doLogin = async (req, res, next) => {
  res.send('hello world');
  // const id = 'hafamily';
  // const pw = 'ae5cf86f2a3a99a943b420c20d7df82f5e6fbed70349f7b1918e0b369bb0c4fd';
  //
  // const inputId = req.body.username;
  // const inputPw = req.body.password;
  //
  // const secret = 'abcdefg';
  // const hash = crypto.createHmac('sha256', secret)
  //   .update(inputPw)
  //   .digest('hex');
  // console.log(hash);
  //
  // if (inputId === id && hash === pw) {
  //   req.session.userId = id;
  //   res.status(200)
  //     .redirect('/');
  // } else {
  //   res.send('<script>alert("암호가 틀렸습니다.");'
  //     + 'history.go(-1)</script>');
  // }
};

export const doLogout = async (req, res, next) => {
  res.send('logout');
};
