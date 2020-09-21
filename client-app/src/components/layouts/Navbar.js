import React, { Fragment, useContext } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import AuthContext from '../../context/auth/AuthContext';

const Navbar = ({ title, icon }) => {
	const authContext = useContext(AuthContext);
	const { isAuthenticated, signOut, user } = authContext;

	const onSignOut = () => {
		signOut();
	};

	const authLinks = (
		<Fragment>
			<li>Hello {user && user.name}</li>
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
