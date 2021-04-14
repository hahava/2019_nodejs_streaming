const commonUtil = {
  isEmpty: function(val) {
    return val === null || val === undefined;
  },

  auth: {
    isLogined: function() {
      return localStorage.getItem('isLogined');
    },

    setLogined: function() {
      localStorage.setItem('isLogined', 'false');
    },
  },
};

export default commonUtil;
