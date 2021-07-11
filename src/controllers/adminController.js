const { _copy } = require("../helpers/helpers");
const { AdminModel } = require("../models");
const { statusCodes, messages, errors } = require("../utls/constants");

exports.saveAdmin = async (req, res) => {
  try {
    const savedAdmin = await new AdminModel(req.body).save();
    if (savedAdmin) {
      return res
        .status(statusCodes.created)
        .json({ message: messages.adminCreated, admin: _copy(savedAdmin) });
    }
    return res
      .status(statusCodes.badRequest)
      .json({ error: messages.adminNotCreated });
  } catch (e) {
    if (e && e.code === 11000) {
      return res
        .status(statusCodes.success)
        .json({ message: messages.adminAlreadyExists });
    }
    return res
      .status(statusCodes.badRequest)
      .json({ error: e.toString(), message: errors.somethingSeemsWrong });
  }
};

exports.updateAdmin = async (req, res) => {
  try {
    const updatedAdmin = await AdminModel.findOneAndUpdate(
      { _id: req.body.id },
      req.body
    );
    if (updatedAdmin) {
      return res
        .status(statusCodes.success)
        .json({ message: messages.adminUpdated, admin: _copy(updatedAdmin) });
    }
    return res
      .status(statusCodes.badRequest)
      .json({ error: messages.adminNotExists });
  } catch (e) {
    return res
      .status(statusCodes.badRequest)
      .json({ error: e.toString(), message: errors.somethingSeemsWrong });
  }
};
