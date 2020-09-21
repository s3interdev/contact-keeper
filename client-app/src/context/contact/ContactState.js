import React, { useReducer } from 'react';
import axios from 'axios';
import ContactContext from './ContactContext';
import ContactReducer from './ContactReducer';
import {
	ADD_CONTACT,
	DELETE_CONTACT,
	CONTACT_ERROR,
	SET_CURRENT,
	CLEAR_CURRENT,
	UPDATE_CONTACT,
	FILTER_CONTACTS,
	CLEAR_FILTER,
} from '../Types';

// create initial state
const ContactState = (props) => {
	const initialState = {
		contacts: [],
		current: null,
		filtered: null,
	};

	const [state, dispatch] = useReducer(ContactReducer, initialState);

	// add contact
	const addContact = async (contact) => {
		const config = { headers: { 'Content-Type': 'application/json' } };

		try {
			const res = await axios.post('/api/contacts', contact, config);
			dispatch({ type: ADD_CONTACT, payload: res.data });
		} catch (err) {
			dispatch({ type: CONTACT_ERROR, payload: err.response.msg });
		}
	};

	// delete contact
	const deleteContact = (id) => {
		dispatch({ type: DELETE_CONTACT, payload: id });
	};

	// set current contact
	const setCurrentContact = (contact) => {
		dispatch({ type: SET_CURRENT, payload: contact });
	};

	// clear current contact
	const clearCurrentContact = () => {
		dispatch({ type: CLEAR_CURRENT });
	};

	// update contact
	const updateContact = (contact) => {
		dispatch({ type: UPDATE_CONTACT, payload: contact });
	};

	// filter contacts
	const filterContacts = (text) => {
		dispatch({ type: FILTER_CONTACTS, payload: text });
	};

	// clear filter
	const clearFilter = () => {
		dispatch({ type: CLEAR_FILTER });
	};

	return (
		<ContactContext.Provider
			value={{
				contacts: state.contacts,
				current: state.current,
				filtered: state.filtered,
				error: state.error,
				addContact,
				deleteContact,
				setCurrentContact,
				clearCurrentContact,
				updateContact,
				filterContacts,
				clearFilter,
			}}
		>
			{props.children}
		</ContactContext.Provider>
	);
};

export default ContactState;
