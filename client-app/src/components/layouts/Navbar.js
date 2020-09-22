import React, { Fragment, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import AuthContext from '../../context/auth/AuthContext';
import ContactContext from '../../context/contact/ContactContext';

const Navbar = ({ title, icon }) => {
	const authContext = useContext(AuthContext);
	const { isAuthenticated, signOut, user, loadUser } = authContext;
	const contactContext = useContext(ContactContext);
	const { clearContacts } = contactContext;

	useEffect(() => {
		loadUser();

		// eslint-disable-next-line
	}, []);

	const onSignOut = () => {
		signOut();
		clearContacts();
	};

	const authLinks = (
		<Fragment>
			<li>Hello, {user && user.name}</li>
			<li>
				<a onClick={onSignOut} href='#!'>
					<i className='fas fa-sign-out-alt' /> <span className='hide-sm'>Sign Out</span>
				</a>
			</li>
		</Fragment>
	);

	const guestLinks = (
		<Fragment>
			<li>
				<Link to='/signup'>Sign Up</Link>
			</li>
			<li>
				<Link to='/signin'>Sign In</Link>
			</li>
			<li>
				<Link to='/about'>About</Link>
			</li>
		</Fragment>
	);

	return (
		<div className='navbar bg-primary'>
			<h3>
				<Link to='/'>
					<i className={icon} /> {title}
				</Link>
			</h3>
			<ul>{isAuthenticated ? authLinks : guestLinks}</ul>
		</div>
	);
};

Navbar.propTypes = {
	title: PropTypes.string.isRequired,
	icon: PropTypes.string,
};

Navbar.defaultProps = {
	title: 'Contact Keeper',
	icon: 'fas fa-id-card-alt',
};

export default Navbar;
