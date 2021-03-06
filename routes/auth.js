const { Router } = require('express');
const router = Router();
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('config');
const User = require('../models/User');
const auth = require('../middleware/auth');

/*  route       -> GET /api/auth
    description -> Get logged in user
    access      -> Private
*/
router.get('/', auth, async (req, res) => {
	try {
		const user = await User.findById(req.user.id).select('-password');

		res.json(user);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('There has been an unfortunate server error.');
	}
});

/*  route       -> POST /api/auth
    description -> Signin user and get token
    access      -> Public
*/
router.post(
	'/',
	[check('email', 'Please enter a valid email address.').isEmail(), check('password', 'Password is a required field.').exists()],
	async (req, res) => {
		const errors = validationResult(req);

		if (!errors.isEmpty()) {
			return res, status(400).json({ errors: errors.array() });
		}

		const { email, password } = req.body;

		try {
			let user = await User.findOne({ email });

			if (!user) {
				return res.status(400).json({ msg: 'The credentials you have entered are not valid.' });
			}

			const isMatch = await bcrypt.compare(password, user.password);

			if (!isMatch) {
				return res.status(400).json({ msg: 'The credentials you have entered are not valid.' });
			}

			// create the Json web token
			const payload = { user: { id: user.id } };
			const maximumAge = 3600; // value of 1 hour

			jwt.sign(payload, config.get('jwtSecret'), { expiresIn: maximumAge }, (err, token) => {
				if (err) {
					throw err;
				} else {
					res.json({ token });
				}
			});
		} catch (err) {
			console.error(err.message);
			res.status(500).send('There has been an unfortunate server error.');
		}
	}
);

// export the route
module.exports = router;
