const { Error422 } = require('../../utils/httpErrors');

/**
 *
 * @param req
 * @param next
 * @param schema
 * @example
 */
module.exports = function validateRequest(req, next, schema) {
  const options = {
    abortEarly: false, // include all errors
    allowUnknown: true, // ignore unknown props
    stripUnknown: true, // remove unknown props
  };
  const { error, value } = schema.validate(req.body, options);
  if (error) {
    next(new Error422(error.details.map((x) => x.message).join(', ')));
  } else {
    req.body = value;
    next();
  }
};
