const { saveCountry } = require('../controllers/countryController');
const { validateSchema } = require('../middlewares/countryMiddleware');

module.exports = (router) => {
	router.get('/country', (req, res) => {
		console.log('getting the countries');
		res.send({ message: 'countries' });
	});
	router.post('/country/add', validateSchema, saveCountry);

	return router;
};
