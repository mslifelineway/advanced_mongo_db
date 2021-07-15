const { _copy } = require("../helpers/helpers");
const { AdminModel } = require("../models");
const { statusCodes, messages, errors } = require("../utls/constants");

exports.saveAdmin = async (req, res, next) => {
  try {
    const savedAdmin = await new AdminModel(req.body).save();
    if (savedAdmin) {
      return res
        .status(statusCodes.created)
        .json({ message: messages.adminCreated, admin: _copy(savedAdmin) });
    }
    return next({
      message: messages.messages.adminNotCreated,
    });
  } catch (e) {
    if (e && e.code === 11000) {
      e.status = statusCodes.success;
      e.message = messages.adminAlreadyExists;
    }
    next(e);
  }
};

exports.updateAdmin = async (req, res, next) => {
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
    return next({
      message: messages.adminNotExists,
      status: statusCodes.notFound,
    });
  } catch (e) {
    const { path } = e;
    if (path) {
      e.message = messages.invalidAdminId;
    }
    next(e);
  }
};

exports.getAdminById = async (req, res, next) => {
  try {
    const admin = await AdminModel.findOne({ _id: req.params.id });
    if (admin)
      return res
        .status(statusCodes.success)
        .json({ message: messages.adminFetched, admin: _copy(admin) });
    return next({
      message: messages.adminNotExists,
      status: statusCodes.notFound,
    });
  } catch (e) {
    const { path } = e;
    if (path) {
      e.message = messages.invalidUserId;
    }
    next(e);
  }
};
