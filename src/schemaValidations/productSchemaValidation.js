const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
exports.addProductSchema = () => {
  const labels = {
    name: "product name",
    quantity: "product quantity",
    uom: "product uom",
    sku: "product sku",
    description: "product description",
    shortDescription: "product short description",
    images: "product images",
    thumbnailImage: "product thumbnail image",
    tags: "product tags",
    createdBy: "created by",
    updatedBy: "updated by",
    brand: "product brand",
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
        "any.required": `Please provide the ${labels.name}.`,
      }),
    quantity: Joi.number()
      .min(1)
      .required()
      .messages({
        "number.base": `${labels.quantity} should be a type of 'number'.`,
        "number.min": `${labels.quantity} must be min {#limit}`,
        "any.required": `Please provide the ${labels.quantity}.`,
      }),
    uom: Joi.string()
      .trim()
      .required()
      .messages({
        "string.base": `${labels.uom} should be a type of 'text'.`,
        "string.empty": `${labels.uom} should not be empty.`,
        "any.required": `Please provide the ${labels.uom}.`,
      }),
    sku: Joi.string()
      .trim()
      .required()
      .messages({
        "string.base": `${labels.sku} should be a type of 'text'.`,
        "string.empty": `${labels.sku} should not be empty.`,
        "any.required": `Please provide the ${labels.sku}.`,
      }),
    description: Joi.string()
      .trim()
      .messages({
        "string.base": `${labels.description} should be a type of 'text'.`,
      }),
    shortDescription: Joi.string()
      .trim()
      .max(200)
      .messages({
        "string.base": `${labels.shortDescription} should be a type of 'text'.`,
        "string.max": `${labels.shortDescription} should not have more than {#limit} chars.`,
      }),
    thumbnailImage: Joi.string()
      .trim()
      .messages({
        "string.base": `${labels.thumbnailImage} should be a type of 'text'.`,
      }),
    // images: Joi.array()
    //   .items(
    //     Joi.object()
    //       .keys({
    //         image: Joi.string().required(),

    //       })
    //       .empty()
    //       .messages({
    //         "object.base": `Tags should be a type of 'Array'.`,
    //         "object.empty": `Product tags should be a type of 'Array'.`,
    //         "any.required": `Object can not be null in product tags array.`,
    //         "object.message": "asdf"
    //       })
    //   )
    //   .required()
    //   .messages({
    //     "array.base": `Product tags should be a type of 'Array'.`,
    //     "any.required": `Please provide the product tags`,
    //   }),
    tags: Joi.array()
      .items(
        Joi.string().trim().empty().max(30).messages({
          "string.base": `Product tags should be type of 'Text'`,
          "string.empty": `Empty products tags not allowed.`,
          "string.max": `Product tags should not have more than {#limit} chars.`,
        })
      )
      .messages({
        "array.base": `Product tags should be a type of 'Array'.`,
      }),
    images: Joi.array()
      .items(
        Joi.string().trim().empty().messages({
          "string.base": `Product images should be type of 'Text'`,
          "string.empty": `Empty products images not allowed.`,
          "string.max": `Product images should not have more than {#limit} chars.`,
        })
      )
      .messages({
        "array.base": `Product images should be a type of 'Array'.`,
      }),

    createdBy: Joi.objectId()
      .empty()
      .required()
      .messages({
        "string.base": `'${labels.createdBy}' should be a type of 'objectId'.`,
        "string.empty": `'${labels.createdBy}' should not be empty.`,
        "string.pattern.name": `Access denied! You don't have permission.`,
        "any.required": `Please provide the '${labels.createdBy}'.`,
      }),
    updatedBy: Joi.objectId()
      .empty()
      .required()
      .messages({
        "string.base": `'${labels.updatedBy}' should be a type of 'objectId'.`,
        "string.empty": `'${labels.updatedBy}' should not be empty.`,
        "string.pattern.name": `Please provide a valid '${labels.updatedBy}'.`,
        "any.required": `Please provide the '${labels.updatedBy}'.`,
      }),
    brand: Joi.objectId()
      .empty()
      .messages({
        "string.base": `${labels.brand} should be a type of 'objectId'.`,
        "string.empty": `${labels.brand} should not be empty.`,
        "string.pattern.name": `Please provide a valid ${labels.brand}.`,
      }),
  });
  return schema;
};
