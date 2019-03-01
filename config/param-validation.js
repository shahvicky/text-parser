const Joi = require('joi');

module.exports = {
  queryText: {
    query: {
      q : Joi.string().required()
    }
  }
};
