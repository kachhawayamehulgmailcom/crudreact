import React from 'react';
import { Switch, Redirect } from 'react-router-dom';
import { RouteWithLayout } from './components';
import { Main as MainLayout } from './layouts';
import { PrivateRoute } from './privateRouter/PrivateRoute';
import {
  User as UserView,
  NotFound as NotFoundView,
  AddEditUser,
} from './views';

const Routes = () => {
  return (
    <Switch>
      <Redirect exact from="/" to="/AddStudent" />
      <PrivateRoute
        component={AddEditUser}
        exact
        layout={MainLayout}
        path="/AddStudent"
      />
      <PrivateRoute
        component={UserView}
        exact
        layout={MainLayout}
        path="/ViewStudent"
        
      />
      <RouteWithLayout
        component={NotFoundView}
        exact
        layout={MainLayout}
        path="/not-found"
      />
      <Redirect to="/not-found" />
    </Switch>
  );
};

export default Routes;
