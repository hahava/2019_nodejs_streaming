export default class ErrorMessage {
  static get ID_NOT_NULL() {
    return 'id must not be null';
  }

  static get PASSWORD_NOT_NULL() {
    return 'password must not be null';
  }

  static get LOGIN_FAIL() {
    return 'Id or password not matched';
  }
};
