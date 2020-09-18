const { Router } = require('express');

const router = Router();

/*  route       -> POST /api/users
    description -> Sign up a user
    access      -> Public
*/
router.post('/', (req, res) => {
	res.send('Sign up a new user...');
});

// export the route
module.exports = router;
