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
    return res.status(statusCodes.badRequest).json({
      error:
        e.toString() && e.toString() !== ""
          ? e.toString()
          : errors.somethingSeemsWrong,
    });
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
    return res.status(statusCodes.badRequest).json({
      error:
        e.toString() && e.toString() !== ""
          ? e.toString()
          : errors.somethingSeemsWrong,
    });
  }
};

exports.getAdminById = async (req, res) => {
  try {
    const admin = await AdminModel.findOne({ _id: req.params.id });
    return res
      .status(statusCodes.success)
      .json({ message: messages.adminFetched, admin: _copy(admin) });
  } catch (e) {
    const { path } = e;
    if (path) {
      return res
        .status(statusCodes.badRequest)
        .json({ error: messages.invalidAdminId });
    }
    return res.status(statusCodes.badRequest).json({
      error:
        e.toString() && e.toString() !== ""
          ? e.toString()
          : errors.somethingSeemsWrong,
    });
  }
};
