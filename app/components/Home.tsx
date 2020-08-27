import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import styles from './Home.css';
import routes from '../constants/routes.json';
import { fetchUser, authed, user, loading, logOut } from '../features/home/homeSlice';
import Spinner from 'react-bootstrap/esm/Spinner';
import UserBanner from '../features/home/UserBanner';

export default function Home() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchUser());
  }, []);
  const isAuthed = useSelector(authed);
  const isLoading = useSelector(loading);
  const User = useSelector(user);
  if (!isAuthed) {
    return <Redirect to={routes.LOGIN} />;
  }
  if (isLoading) {
    return <Spinner animation="border" />;
  }
  return (
    <>
      <UserBanner user={User} logout={() => dispatch(logOut())}/>
    </>
  );
}
