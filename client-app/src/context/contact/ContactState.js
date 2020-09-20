import React, { useReducer } from 'react';
import uuid from 'uuid';
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
	};

	const [state, dispatch] = useReducer(ContactReducer, initialState);

	// add contact

	// delete contact

	// set current contact

	// clear current contact

	// update contact

	// filter contacts

	// clear filter

	return <ContactContext.Provider value={{ contacts: state.contacts }}>{props.children}</ContactContext.Provider>;
};

export default ContactState;
