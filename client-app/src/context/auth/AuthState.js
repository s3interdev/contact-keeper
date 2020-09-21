import React, { useReducer } from 'react';
import axios from 'axios';
import AuthContext from './AuthContext';
import AuthReducer from './AuthReducer';
import SetAuthToken from '../../utils/SetAuthToken';
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
	const loadUser = async () => {
		// load token into global headers
		if (localStorage.token) {
			SetAuthToken(localStorage.token);
		}

		try {
			const res = await axios.get('/api/auth');

			dispatch({ type: USER_LOADED, payload: res.data });
		} catch (err) {
			dispatch({ type: AUTH_ERROR });
		}
	};

	// sign up user
	const signUp = async (formData) => {
		const config = { headers: { 'Content-Type': 'application/json' } };

		try {
			const res = await axios.post('/api/users', formData, config);

			dispatch({ type: SIGNUP_SUCCESS, payload: res.data });
			loadUser();
		} catch (err) {
			dispatch({ type: SIGNUP_FAIL, payload: err.response.data.msg });
		}
	};

	// sign in user
	const signIn = async (formData) => {
		const config = { headers: { 'Content-Type': 'application/json' } };

		try {
			const res = await axios.post('/api/auth', formData, config);

			dispatch({ type: SIGNIN_SUCCESS, payload: res.data });
			loadUser();
		} catch (err) {
			dispatch({ type: SIGNIN_FAIL, payload: err.response.data.msg });
		}
	};

	// sign out user
	const signOut = () => console.log('Sign out user...');

	// clear errors
	const clearErrors = () => dispatch({ type: CLEAR_ERRORS });

	return (
		<AuthContext.Provider
			value={{
				token: state.token,
				isAuthenticated: state.isAuthenticated,
				loading: state.loading,
				user: state.user,
				error: state.error,
				signUp,
				loadUser,
				signIn,
				signOut,
				clearErrors,
			}}
		>
			{props.children}
		</AuthContext.Provider>
	);
};

export default AuthState;
