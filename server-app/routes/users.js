const { Router } = require('express');
const router = Router();
const { check, validationResult } = require('express-validator');

const User = require('../models/User');

/*  route       -> POST /api/users
    description -> Sign up a user
    access      -> Public
*/
router.post(
	'/',
	[
		check('name', 'Name is a required field.').not().isEmpty(),
		check('email', 'Enter a valid email address.').isEmail(),
		check('password', 'Enter a password with a minimum of 8 characters.').isLength({ min: 8 }),
	],
	(req, res) => {
		const errors = validationResult(req);

		if (!errors.isEmpty()) {
			return res, status(400).json({ errors: errors.array() });
		}

		res.send('Things check out...');
	}
);

// export the route
module.exports = router;
