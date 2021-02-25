import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function PrivateRoute({ component: Component, ...rest }) {
  const { currentUser } = useAuth();
  
  return (
    <Route
      {...rest}
      // Create own render
      render={props => {
        // If we have a current user (logged in), we render component with all the props. Else redirect to login page
        return currentUser ? <Component {...props} /> : <Redirect to="/login" />
      }}
    >

    </Route>
  )
}
