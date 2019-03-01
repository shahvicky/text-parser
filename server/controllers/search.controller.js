const parser = require('../services/parser');

/**
 * The function to receive a text query and return a parsed JSON
 * @param {*} req 
 * @param {*} res 
 */
const parseTOJSON = (req, res) => {
  let text = req.query.q;
  res.json(parser.parse(text));
}

module.exports = {parseTOJSON}