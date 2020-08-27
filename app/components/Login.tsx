import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Spinner from 'react-bootstrap/Spinner';
import routes from '../constants/routes.json';
import styles from './Login.css';
import Config from '../lib/Config';
import {
  enableLoading,
  isLoading
} from '../features/login/loginSlice';

export default function Login() {
  const dispatch = useDispatch();
  const loading = useSelector(isLoading);
  const config = new Config();
  if(config.getAccessToken()) {
    return <Redirect to={routes.HOME}/>;
  }
  return (
    <div>
      <style>
            {
              `
              body {
                display: flex;
                align-items: center;
                justify-content: center;
                text-align: center;
              }
              `
            }
        </style>
      {loading ? <div>Waiting for Twitch authentication...<div><Spinner animation="border"/></div></div> : <button onClick={() => dispatch(enableLoading())} className={styles.loginButton}><i className='fab fa-lg fa-twitch'/>CONNECT WITH TWITCH</button>}
    </div>
  );
}