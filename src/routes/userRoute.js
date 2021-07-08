const { register } = require('../controllers/userController');
const { validateSchema } = require('../middlewares/userMiddleware');

module.exports = (router) => {
	router.get('/users', (req, res) => {
		console.log('getting the users');
		res.send({ message: 'users' });
	});
	router.post('/user/register', validateSchema, register);

	return router;
};
