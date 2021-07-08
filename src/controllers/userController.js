const { _copy } = require('../helpers/helpers');
const { UserModel } = require('../models');
const { statusCodes, messages, errors } = require('../utls/constants');

exports.register = async (req, res) => {
	try {
		const savedUser = await new UserModel(req.body).save();
		if (savedUser) {
			return res.status(statusCodes.created).json({ message: messages.userCreated, user: _copy(savedUser) });
		}
		return res.status(statusCodes.failed).json({ message: messages.userNotCreated });
	} catch (e) {
		if (e && e.code === 11000) {
			return res.status(statusCodes.success).json({ message: messages.userAlreadyExists });
		}
		return res.status(statusCodes.bad).json({ error: e.toString(), message: errors.somethingSeemsWrong });
	}
};
