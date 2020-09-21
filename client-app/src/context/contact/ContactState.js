import React, { useReducer } from 'react';
import { v4 as uuidv4 } from 'uuid';
import ContactContext from './ContactContext';
import ContactReducer from './ContactReducer';
import { ADD_CONTACT, DELETE_CONTACT, SET_CURRENT, CLEAR_CURRENT, UPDATE_CONTACT, FILTER_CONTACTS, CLEAR_FILTER } from '../Types';

// create initial state
const ContactState = (props) => {
	const initialState = {
		contacts: [
			{
				id: 1,
				name: 'Riley Wells',
				email: 'riley.wells@email.com',
				phone: '(505)-722-2121',
				type: 'professional',
			},
			{
				id: 2,
				name: 'Cathy Day',
				email: 'cathy.day@email.com',
				phone: '(788)-693-8811',
				type: 'personal',
			},
			{
				id: 3,
				name: 'Ivan Moreno',
				email: 'ivan.moreno@email.com',
				phone: '(955)-082-0096',
				type: 'professional',
			},
			{
				id: 4,
				name: 'Denise Lawrence',
				email: 'denise.lawrence@email.com',
				phone: '(240)-521-7675',
				type: 'personal',
			},
			{
				id: 5,
				name: 'Connor Bailey',
				email: 'connor.bailey@email.com',
				phone: '(253)-806-1866',
				type: 'professional',
			},
		],
		current: null,
		filtered: null,
	};

	const [state, dispatch] = useReducer(ContactReducer, initialState);

	// add contact
	const addContact = (contact) => {
		contact.id = uuidv4();
		dispatch({ type: ADD_CONTACT, payload: contact });
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
