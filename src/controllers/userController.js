const { _copy } = require("../helpers/helpers");
const { UserModel } = require("../models");
const { statusCodes, messages, errors } = require("../utls/constants");

exports.saveUser = async (req, res) => {
  try {
    const savedUser = await new UserModel(req.body).save();
    if (savedUser) {
      return res
        .status(statusCodes.created)
        .json({ message: messages.userCreated, user: _copy(savedUser) });
    }
    return res
      .status(statusCodes.badRequest)
      .json({ error: messages.userNotCreated });
  } catch (e) {
    if (e && e.code === 11000) {
      return res
        .status(statusCodes.success)
        .json({ message: messages.userAlreadyExists });
    }
    return res.status(statusCodes.badRequest).json({
      error:
        e.toString() && e.toString() !== ""
          ? e.toString()
          : errors.somethingSeemsWrong,
    });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const updatedUser = await UserModel.findOneAndUpdate(
      { _id: req.body.id },
      req.body
    );
    if (updatedUser) {
      return res
        .status(statusCodes.success)
        .json({ message: messages.userUpdated, user: _copy(updatedUser) });
    }
    return res
      .status(statusCodes.badRequest)
      .json({ error: messages.userNotUpdated });
  } catch (e) {
    return res.status(statusCodes.badRequest).json({
      error:
        e.toString() && e.toString() !== ""
          ? e.toString()
          : errors.somethingSeemsWrong,
    });
  }
};
exports.getAllUsers = async (req, res) => {
  try {
    const users = await UserModel.find({});
    return res
      .status(statusCodes.success)
      .json({ users: _copy(users), message: messages.allUsersFetched });
  } catch (e) {
    return res.status(statusCodes.badRequest).json({
      error:
        e.toString() && e.toString() !== ""
          ? e.toString()
          : errors.somethingSeemsWrong,
    });
  }
};
exports.getUserById = async (req, res) => {
  try {
    const user = await UserModel.findOne({ _id: req.params.id });
    return res
      .status(statusCodes.success)
      .json({ users: _copy(user), message: messages.userFetched });
  } catch (e) {
    const { path } = e;
    if (path) {
      return res
        .status(statusCodes.badRequest)
        .json({ error: messages.invalidUserId });
    }
    return res.status(statusCodes.badRequest).json({
      error:
        e.toString() && e.toString() !== ""
          ? e.toString()
          : errors.somethingSeemsWrong,
    });
  }
};
