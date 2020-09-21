import React, { useState, useContext, useEffect } from 'react';
import AlertContext from '../../context/alert/AlertContext';
import AuthContext from '../../context/auth/AuthContext';

const SignUp = (props) => {
	const alertContext = useContext(AlertContext);
	const authContext = useContext(AuthContext);
	const { setAlert } = alertContext;
	const { signUp, error, clearErrors, isAuthenticated } = authContext;

	useEffect(() => {
		if (isAuthenticated) {
			props.history.push('/');
		}

		if (error === 'User with the email aready exists.') {
			setAlert(error, 'danger');
			clearErrors();
		}

		// eslint-disable-next-line
	}, [error, isAuthenticated, props.history]);

	const [user, setUser] = useState({
		name: '',
		email: '',
		password: '',
		confirmPassword: '',
	});

	const { name, email, password, confirmPassword } = user;

	const onChange = (event) => setUser({ ...user, [event.target.name]: event.target.value });

	const onSubmit = (event) => {
		event.preventDefault();

		if (name === '' || email === '' || password === '' || confirmPassword === '') {
			setAlert('All fields are required.', 'danger');
		} else if (password !== confirmPassword) {
			setAlert('The passwords do not match.', 'danger');
		} else {
			signUp({ name, email, password });
		}
	};

	return (
		<div className='form-container'>
			<h1>
				Account <span className='text-primary'>Sign Up</span>
			</h1>
			<form onSubmit={onSubmit}>
				<div className='form-group'>
					<label htmlFor='name'>Name</label>
					<input type='text' name='name' value={name} onChange={onChange} />
				</div>
				<div className='form-group'>
					<label htmlFor='name'>Email</label>
					<input type='email' name='email' value={email} onChange={onChange} />
				</div>
				<div className='form-group'>
					<label htmlFor='name'>Password</label>
					<input type='password' name='password' value={password} onChange={onChange} minLength='8' />
				</div>
				<div className='form-group'>
					<label htmlFor='name'>Confirm Password</label>
					<input type='password' name='confirmPassword' value={confirmPassword} onChange={onChange} minLength='8' />
				</div>
				<input type='submit' value='Sign Up' className='btn btn-primary btn-block' />
			</form>
		</div>
	);
};

export default SignUp;
