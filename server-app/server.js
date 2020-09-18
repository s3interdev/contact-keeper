const express = require('express');
const morgan = require('morgan');

const app = express();

// middleware
app.use(morgan('dev'));

// initialize server port
const PORT = process.env.PORT || 5000;

// initialize server
app.listen(PORT, () => console.log(`Express server started on port ${PORT}...`));

// routes
app.get('/', (req, res) => {
	res.json({ msg: 'Hello, welcome to the Contact Keeper API...' });
});
