const { _copy } = require("../helpers/helpers");
const { AdminModel } = require("../models");

exports.findCountryByAdminId = async (_id) => {
  const adminCountry = await AdminModel.findOne(
    { _id },
    { country: 1, _id: 1 }
  ).populate({
    path: "country",
    select: { country: 1, code: 1 },
  });
  return _copy(adminCountry);
};
