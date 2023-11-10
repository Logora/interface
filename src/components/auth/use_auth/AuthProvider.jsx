import React, { useState } from 'react';
import { AuthContext } from './AuthContext';

export const AuthProvider = (props) => {
    const [currentUser, setCurrentUser] = useState({});
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isLoggingIn, setIsLoggingIn] = useState(true);
    const [authError, setAuthError] = useState(false);

    return (
        <AuthContext.Provider value={{ currentUser, setCurrentUser, isLoggedIn, setIsLoggedIn, isLoggingIn, setIsLoggingIn, authError, setAuthError }}>
            { props.children }
        </AuthContext.Provider>
    );
}

export const withAuth = Component => props => (
  <AuthContext.Consumer>
    { context => <Component {...props} {...context} /> }
  </AuthContext.Consumer>
)