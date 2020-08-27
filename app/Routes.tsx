/* eslint react/jsx-props-no-spreading: off */
import React from 'react';
import { Switch, Route } from 'react-router-dom';
import routes from './constants/routes.json';
import App from './containers/App';
import LoginPage from './containers/LoginPage';
import CounterPage from './containers/CounterPage';
import HomePage from './containers/HomePage';

//.const LazyHomePage = React.lazy(() =>
//  import(/* webpackChunkName: "CounterPage" */ './containers/HomePage')
//);

/*const HomePage = (props: Record<string, any>) => (
  <React.Suspense fallback={<Spinner animation="border"/>}>
    <LazyHomePage {...props} />
  </React.Suspense>
);*/

export default function Routes() {
  return (
    <App>
      <Switch>
        <Route path={routes.HOME} component={HomePage} />
        <Route path={routes.COUNTER} component={CounterPage} />
        <Route path={routes.LOGIN} component={LoginPage} />
      </Switch>
    </App>
  );
}
