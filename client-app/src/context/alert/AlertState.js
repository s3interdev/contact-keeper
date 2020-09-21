import React, { useReducer } from 'react';
import { v4 as uuidv4 } from 'uuid';
import AlertContext from './AlertContext';
import AlertReducer from './AlertReducer';
import { SET_ALERT, REMOVE_ALERT } from '../Types';

// create initial state
const AlertState = (props) => {
	const initialState = [];

	const [state, dispatch] = useReducer(AlertReducer, initialState);

	// set alert
	const setAlert = (msg, type, timeout = 3000) => {
		const id = uuidv4();

		dispatch({ type: SET_ALERT, payload: { msg, type, id } });

		// clear the alert after 3 seconds
		setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id }), timeout);
	};

	// clear the alert

	return (
		<AlertContext.Provider
			value={{
				alerts: state,
				setAlert,
			}}
		>
			{props.children}
		</AlertContext.Provider>
	);
};

export default AlertState;
