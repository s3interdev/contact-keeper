const { Router } = require('express');
const router = Router();
const { check, validationResult } = require('express-validator');
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
router.post('/', [auth, [check('name', 'Name is a required filed.').not().isEmpty()]], async (req, res) => {
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		return res, status(400).json({ errors: errors.array() });
	}

	const { name, email, phone, type } = req.body;

	try {
		const newContact = new Contact({ name, email, phone, type, user: req.user.id });

		// save contact to database
		const contact = await newContact.save();

		// return result to client
		res.json(contact);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('There has been an unfortunate server error.');
	}
});

/*  route       -> PUT /api/contacts/:id
    description -> Update a contact for the logged in user
    access      -> Private
*/
router.put('/:id', auth, async (req, res) => {
	const { name, email, phone, type } = req.body;

	// build a contact object
	const contactFields = {};

	if (name) contactFields.name = name;
	if (email) contactFields.email = email;
	if (phone) contactFields.phone = phone;
	if (type) contactFields.type = type;

	try {
		let contact = await Contact.findById(req.params.id);

		if (!contact) return res.status(404).json({ msg: 'The contact does not exist.' });

		// ensure user owns the contact
		if (contact.user.toString() !== req.user.id) {
			return res.status(401).json({ msg: 'You are not authorized to edit this contact.' });
		}

		contact = await Contact.findByIdAndUpdate(req.params.id, { $set: contactFields }, { new: true });
		res.json(contact);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('There has been an unfortunate server error.');
	}
});

/*  route       -> DELETE /api/contacts/:id
    description -> Delete a contact for the logged in user
    access      -> Private
*/
router.delete('/:id', auth, async (req, res) => {
	try {
		let contact = await Contact.findById(req.params.id);

		if (!contact) return res.status(404).json({ msg: 'The contact does not exist.' });

		// ensure user owns the contact
		if (contact.user.toString() !== req.user.id) {
			return res.status(401).json({ msg: 'You are not authorized to delete this contact.' });
		}

		await Contact.findByIdAndRemove(req.params.id);
		res.json({ msg: 'Contact has been removed.' });
	} catch (err) {
		console.error(err.message);
		res.status(500).send('There has been an unfortunate server error.');
	}
});

// export the route
module.exports = router;
