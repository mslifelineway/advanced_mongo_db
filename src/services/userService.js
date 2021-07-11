const { _copy } = require("../helpers/helpers");
const { UserModel } = require("../models");

exports.findCountryByUserId = async (_id) => {
  const userCountry = await UserModel.findOne(
    { _id },
    { country: 1, _id: 1 }
  ).populate({
    path: "country",
    select: { country: 1, code: 1 },
  });
  return _copy(userCountry);
};
