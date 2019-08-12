import React from 'react';
import propTypes from 'prop-types';

import '../style.css';

const LoginTrue = ({ dispatch, signIn }) => {
  const LogOut = () => {
    const nickname = localStorage.getItem('nickname');
    if (nickname !== null) {
      localStorage.removeItem('nickname');
      dispatch(signIn());
    }
  };

  return (
    <div className="log-in-block-true">
      <input
        className="input-login"
        type="button"
        value="logout"
        onClick={LogOut}
      />
    </div>
  );
};


export default LoginTrue;

LoginTrue.propTypes = {
  dispatch: propTypes.func.isRequired,
  signIn: propTypes.func.isRequired,
};

LoginTrue.default = {
  dispatch: () => {},
  logged: Boolean,
  signIn: () => {},
};
