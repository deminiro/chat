import React, { useState } from 'react';
import propTypes from 'prop-types';

import '../style.css';

const LoginFalse = ({ dispatch, signIn }) => {
  const [nickname, setNickname] = useState('');

  const handleChange = ({ target }) => {
    setNickname(target.value);
  };

  const submitSignIn = () => {
    if (nickname !== '') {
      localStorage.setItem('nickname', nickname);
      dispatch(signIn());
    }
  };

  return (
    <div className="log-in-block-false">
      <input
        className="input-text-for-name"
        type="text"
        placeholder="Write name for chat"
        onChange={handleChange}
      />
      <input
        className="input-submit-for-name"
        type="submit"
        onClick={submitSignIn}
      />
    </div>
  );
};


export default LoginFalse;

LoginFalse.propTypes = {
  dispatch: propTypes.func.isRequired,
  signIn: propTypes.func.isRequired,
};

LoginFalse.default = {
  dispatch: () => {},
  logged: Boolean,
  signIn: () => {},
};
