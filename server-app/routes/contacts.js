const { Router } = require('express');
const router = Router();
const { check, validationResult } = require('express-validator');
const User = require('../models/User');
const Contact = require('../models/Contact');
const auth = require('../middleware/auth');

/*  route       -> GET /api/contacts
    description -> Get all contacts for the logged in user
    access      -> Private
*/
router.get('/', auth, async (req, res) => {
	try {
		const contacts = await Contact.find({ user: req.user.id }).sort({ date: -1 });

		res.json(contacts);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('There has been an unfortunate server error.');
	}
});

/*  route       -> POST /api/contacts
    description -> Add new contact for the logged in user
    access      -> Private
*/
router.post('/', (req, res) => {
	res.send('Add new contact for the user...');
});

/*  route       -> PUT /api/contacts/:id
    description -> Update a contact for the logged in user
    access      -> Private
*/
router.put('/:id', (req, res) => {
	res.send('Update a contact for the user...');
});

/*  route       -> DELETE /api/contacts/:id
    description -> Delete a contact for the logged in user
    access      -> Private
*/
router.delete('/:id', (req, res) => {
	res.send('Delete a contacts for the user...');
});

// export the route
module.exports = router;
