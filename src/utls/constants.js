exports._copy = (c) => {
	return JSON.parse(JSON.stringify(c));
};

exports.errors = {
	invalidPhoneNumber: 'Invalid phone number!',
	somethingSeemsWrong: 'Oops! something seems wrong.',
	somethingWentWrong: 'Oops! something went wrong.',
};

exports.statusCodes = {
	created: 201,
	failed: 400,
	bad: 500,
};

exports.messages = {
	countrySaved: 'Country added successfully!',
	countryNotSaved: 'Country coud not saved!',
};
