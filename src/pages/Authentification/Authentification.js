import React, { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import logo from '../../logo.svg';
import * as exampleActions from '../../redux/example/actions';

function Authentification() {
  const examples = useSelector(state => state.examples);
  const dispatch = useDispatch();

  useEffect( () => {
    dispatch(exampleActions.fetchRedditList());
  }, []);

  console.log(examples);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Authentification Screen.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

Authentification.propTypes = {};
Authentification.defaultProps = {};

export default Authentification;
