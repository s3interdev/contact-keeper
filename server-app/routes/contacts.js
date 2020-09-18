const { Router } = require('express');

const router = Router();

/*  route       -> GET /api/contacts
    description -> Get all contacts for the logged in user
    access      -> Private
*/
router.get('/', (req, res) => {
	res.send('Get all contacts for the user...');
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
