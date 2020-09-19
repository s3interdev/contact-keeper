const jwt = require('jsonwebtoken');
const config = require('config');

// export middleware
module.exports = function (req, res, next) {
	// get the token from the header
	const token = req.header('x-auth-token');

	// check if token exists
	if (!token) {
		return res.status(401).json({ msg: 'Security token has not been found. Authorization has been denied.' });
	}

	// verify the token
	try {
		const decoded = jwt.verify(token, config.get('jwtSecret'));

		req.user = decoded.user;
		next();
	} catch (err) {
		res.status(401).json({ msg: 'Security token is not valid. Authorization has been denied.' });
	}
};
