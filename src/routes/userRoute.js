const { register } = require('../controllers/user');
const { validateNewRegister } = require('../middlewares/user');

module.exports = (router) => {
	router.get('/users', (req, res) => {
		console.log('getting the users');
		res.send({ message: 'users' });
	});
	router.post('/user/register', validateNewRegister, register);

	return router;
};
