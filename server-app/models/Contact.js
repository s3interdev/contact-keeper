const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
	// relate contacts to the users collection
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'users',
	},
	name: {
		type: String,
		required: true,
	},
	email: {
		type: String,
	},
	phone: {
		type: String,
	},
	type: {
		type: String,
		default: 'personal',
	},
	date: {
		type: Date,
		default: Date.now,
	},
});

const Contact = mongoose.model('contact', contactSchema);

// export the model
module.exports = Contact;
