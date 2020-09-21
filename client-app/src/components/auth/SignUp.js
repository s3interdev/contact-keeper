import React, { useState, useContext } from 'react';
import AlertContext from '../../context/alert/AlertContext';

const SignUp = () => {
	const alertContext = useContext(AlertContext);

	const { setAlert } = alertContext;

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
			console.log('Sign up successfully submitted...');
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
