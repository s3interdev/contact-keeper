import React, { useState } from 'react';

const SignIn = () => {
	const [user, setUser] = useState({
		email: '',
		password: '',
	});

	const { email, password } = user;

	const onChange = (event) => setUser({ ...user, [event.target.name]: event.target.value });

	const onSubmit = (event) => {
		event.preventDefault();
		console.log('Sign in submitted...');
	};

	return (
		<div className='form-container'>
			<h1>
				Account <span className='text-primary'>Sign In</span>
			</h1>
			<form onSubmit={onSubmit}>
				<div className='form-group'>
					<label htmlFor='name'>Email</label>
					<input type='email' name='email' value={email} onChange={onChange} />
				</div>
				<div className='form-group'>
					<label htmlFor='name'>Password</label>
					<input type='password' name='password' value={password} onChange={onChange} />
				</div>
				<input type='submit' value='Sign In' className='btn btn-primary btn-block' />
			</form>
		</div>
	);
};

export default SignIn;
