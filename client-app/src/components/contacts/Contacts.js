import React, { Fragment, useContext } from 'react';
import ContactItem from './ContactItem';
import ContactContext from '../../context/contact/ContactContext';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

const Contacts = () => {
	// initialize context
	const contactContext = useContext(ContactContext);

	const { contacts, filtered } = contactContext;

	if (contacts.length === 0) {
		return <h4>Please add a contact to proceed...</h4>;
	}

	return (
		<Fragment>
			<TransitionGroup>
				{filtered !== null
					? filtered.map((contact) => (
							<CSSTransition key={contact._id} timeout={1000} classNames='item'>
								<ContactItem contact={contact} />
							</CSSTransition>
					  ))
					: contacts.map((contact) => (
							<CSSTransition key={contact._id} timeout={1000} classNames='item'>
								<ContactItem contact={contact} />
							</CSSTransition>
					  ))}
			</TransitionGroup>
		</Fragment>
	);
};

export default Contacts;
