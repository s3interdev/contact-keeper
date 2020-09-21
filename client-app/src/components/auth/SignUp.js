import React, { useState } from 'react';

const SignUp = () => {
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
		console.log('Sign up submitted...');
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
					<input type='password' name='password' value={password} onChange={onChange} />
				</div>
				<div className='form-group'>
					<label htmlFor='name'>Confirm Password</label>
					<input type='password' name='confirmPassword' value={confirmPassword} onChange={onChange} />
				</div>
				<input type='submit' value='Sign Up' className='btn btn-primary btn-block' />
			</form>
		</div>
	);
};

export default SignUp;
