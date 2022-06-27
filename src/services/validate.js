const Ajv = require('ajv');

const ajv = new Ajv();

const validate = (schema) => (req, res, next) => {
  try {
    const data = { nickname: req.body.nickname, text: req.body.text };
    const valid = ajv.validate(schema, data);
    if (!valid) {
      res.status(400).json({ message: 'No', type: 'valid', success: false });
    }
    if (valid) {
      next();
    }
  } catch (error) {
    next(error);
  }
};
module.exports.validate = validate;
