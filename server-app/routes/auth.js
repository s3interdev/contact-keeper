const { Router } = require('express');

const router = Router();

/*  route       -> GET /api/auth
    description -> Get logged in user
    access      -> Private
*/
router.get('/', (req, res) => {
	res.send('Get a logged in user...');
});

/*  route       -> POST /api/auth
    description -> Signin user and get token
    access      -> Public
*/
router.post('/', (req, res) => {
	res.send('Signin user...');
});

// export the route
module.exports = router;
