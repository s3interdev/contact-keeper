const { Router } = require('express');
const router = Router();
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('config');
const User = require('../models/User');

/*  route       -> POST /api/users
    description -> Sign up a user
    access      -> Public
*/
router.post(
	'/',
	[
		check('name', 'Name is a required field.').not().isEmpty(),
		check('email', 'Please enter a valid email address.').isEmail(),
		check('password', 'Please enter a password with a minimum of 8 characters.').isLength({ min: 8 }),
	],
	async (req, res) => {
		const errors = validationResult(req);

		if (!errors.isEmpty()) {
			return res, status(400).json({ errors: errors.array() });
		}

		const { name, email, password } = req.body;

		try {
			let user = await User.findOne({ email });

			if (user) {
				return res.sta(400).json({ msg: 'User with the email aready exists.' });
			}

			user = new User({ name, email, password });

			// encrypt the password before saving the user data to the database
			const salt = await bcrypt.genSalt();

			user.password = await bcrypt.hash(password, salt);

			// save the user to the database
			await user.save();

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
