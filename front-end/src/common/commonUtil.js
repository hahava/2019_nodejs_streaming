const commonUtil = {
  isEmpty: function(val) {
    return val === null || val === undefined;
  },

  auth: {
    isLogined: function() {
      return localStorage.getItem('isLogined') === 'true';
    },

    // true or false
    setLogined: function(status) {
      localStorage.setItem('isLogined', status);
    },
  },
};

export default commonUtil;
