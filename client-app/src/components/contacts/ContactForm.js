import React, { useState, useContext, useEffect } from 'react';
import ContactContext from '../../context/contact/ContactContext';

const ContactForm = () => {
	const contactContext = useContext(ContactContext);

	const { addContact, updateContact, clearCurrentContact, current } = contactContext;

	useEffect(() => {
		if (current !== null) {
			setContact(current);
		} else {
			setContact({
				name: '',
				email: '',
				phone: '',
				type: 'personal',
			});
		}
	}, [contactContext, current]);

	const [contact, setContact] = useState({
		name: '',
		email: '',
		phone: '',
		type: 'personal',
	});

	const { name, email, phone, type } = contact;

	const onChange = (event) => setContact({ ...contact, [event.target.name]: event.target.value });

	const onSubmit = (event) => {
		event.preventDefault();

		if (current === null) {
			addContact(contact);
		} else {
			updateContact(contact);
		}

		clearAllFormFields();
	};

	const clearAllFormFields = () => {
		clearCurrentContact();
	};

	return (
		<form onSubmit={onSubmit}>
			<h2 className='text-primary'>{current ? 'Update Contact' : 'Add Contact'}</h2>
			<input type='text' placeholder='Name...' name='name' value={name} onChange={onChange} />
			<input type='email' placeholder='Email address...' name='email' value={email} onChange={onChange} />
			<input type='text' placeholder='Phone number...' name='phone' value={phone} onChange={onChange} />
			<h4>Contact Type</h4>
			<input type='radio' name='type' value='personal' checked={type === 'personal'} onChange={onChange} /> Personal{' '}
			<input type='radio' name='type' value='professional' checked={type === 'professional'} onChange={onChange} /> Professional{' '}
			<div>
				<input type='submit' value={current ? 'Update Contact' : 'Add Contact'} className='btn btn-primary btn-block' />
			</div>
			{current && (
				<div>
					<button className='btn btn-light btn-block' onClick={clearAllFormFields}>
						Clear
					</button>
				</div>
			)}
		</form>
	);
};

export default ContactForm;
