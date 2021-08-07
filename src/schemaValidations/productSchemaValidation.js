const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
exports.addProductSchema = () => {
  const labels = {
    name: "Product name",
    quantity: "Product quantity",
    uom: "Product uom",
    slug: "Product slug",
    sku: "Product sku",
    description: "Product description",
    shortDescription: "Product short description",
    images: "Product images",
    thumbnailImage: "Product thumbnail image",
    tags: "Product tags",
    createdBy: "Created by",
    updatedBy: "Updated by",
    brand: "Product Brand",
  };
  const schema = Joi.object({
    name: Joi.string()
      .trim()
      .min(3)
      .max(200)
      .required()
      .messages({
        "string.base": `${labels.name} should be a type of 'text'.`,
        "string.empty": `${labels.name} should not be empty.`,
        "string.min": `${labels.name} must contain min {#limit} chars.`,
        "string.max": `${labels.name} should not have more than {#limit} chars.`,
        "any.required": `Please provide your ${labels.name}.`,
      }),
    quantity: Joi.string()
      .trim()
      .min(1)
      .required()
      .messages({
        "string.base": `${labels.quantity} should be a type of 'text'.`,
        "string.empty": `${labels.quantity} should not be empty.`,
        "string.min": `${labels.quantity} must contain min {#limit} chars.`,
        "any.required": `Please provide the ${labels.quantity}.`,
      }),
  });
  return schema;
};
