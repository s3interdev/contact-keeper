const express = require('express');
const connectDb = require('./config/db');
const path = require('path');
const morgan = require('morgan');

const app = express();

// middleware
app.use(express.json({ extended: false }));
app.use(morgan('dev'));

// connect to database
connectDb();

// initialize server port
const PORT = process.env.PORT || 5000;

// initialize the server
app.listen(PORT, () => console.log(`Express server started on port ${PORT}...`));

// define routes
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/contacts', require('./routes/contacts'));

// serve static assets in production
if (process.env.NODE_ENV == 'production') {
	// set static folder
	app.use(express.static('client-app/build'));

	app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, 'client-app', 'build', 'index.html')));
}
