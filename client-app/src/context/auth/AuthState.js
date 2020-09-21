import React, { useReducer } from 'react';
import AuthContext from './AuthContext';
import AuthReducer from './AuthReducer';
import { SIGNUP_SUCCESS, SIGNUP_FAIL, USER_LOADED, AUTH_ERROR, SIGNIN_SUCCESS, SIGNIN_FAIL, SIGNOUT, CLEAR_ERRORS } from '../Types';

// create initial state
const AuthState = (props) => {
	const initialState = {
		token: localStorage.getItem('token'),
		isAuthenticated: null,
		user: null,
		loading: true,
		error: null,
	};

	const [state, dispatch] = useReducer(AuthReducer, initialState);

	// load user

	// sign up user

	// sign in user

	// sign out user

	// clear errors

	return (
		<AuthContext.Provider
			value={{
				token: state.token,
				isAuthenticated: state.isAuthenticated,
				loading: state.loading,
				user: state.user,
				error: state.error,
			}}
		>
			{props.children}
		</AuthContext.Provider>
	);
};

export default AuthState;
