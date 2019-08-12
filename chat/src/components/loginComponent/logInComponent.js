import React from 'react';
import propTypes from 'prop-types';

import LogInTrue from './loginTrue/logInTrue';
import LogInFalse from './loginFalse/logInFalse';

const LogInComponent = ({ logged, signIn, dispatch }) => (
  <div>
    {logged
      ? <LogInTrue dispatch={dispatch} signIn={signIn} />
      : <LogInFalse dispatch={dispatch} signIn={signIn} />}
  </div>
);

export default LogInComponent;

LogInComponent.propTypes = {
  logged: propTypes.bool,
  signIn: propTypes.func,
  dispatch: propTypes.func,
};

LogInComponent.defaultProps = {
  logged: false,
  signIn: () => {},
  dispatch: () => {},
};
