const { _copy } = require("../helpers/helpers");
const { ProductModel } = require("../models");
const { messages } = require("../utls/constants");

exports.addProduct = async (req, res, next) => {
  try {
    const addProduct = await new ProductModel(req.body).save();
    if (addProduct) {
      return res
        .status(statusCodes.created)
        .json({ message: messages.userCreated, user: _copy(addProduct) });
    }
    return next({
      message: messages.productNotCreated,
    });
  } catch (e) {
    if (e && e.code === 11000) {
      e.status = statusCodes.success;
      e.message = messages.productAlreadyCreated;
    }
    return next(e);
  }
};
