const { insert, findCountryByName } = require('../services/countryService');

exports.saveCountry = async (req, res) => {
	const countryResp = await insert(req.body);
	// const countryResp = await findCountryByName();
	return res.status(countryResp.status).json(countryResp);
};
