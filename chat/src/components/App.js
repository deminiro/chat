import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import signIn from '../redux/actions';
import Inputs from './messageComponent/inputs';
import LogInComponent from './loginComponent/logInComponent';
import RequireToLogIn from './loginComponent/loginFalse/requireToLogIn';

const App = () => {
  const logged = useSelector(state => state.loggedReducer);
  const dispatch = useDispatch();
  return (
    <>
      <LogInComponent dispatch={dispatch} signIn={signIn} logged={logged} />
      {logged ? <Inputs /> : <RequireToLogIn />}
    </>
  );
};


export default App;
