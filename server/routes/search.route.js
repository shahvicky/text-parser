const express = require('express');
const validate = require('express-validation');
const paramValidation = require('../../config/param-validation');
const searchCtrl = require('../controllers/search.controller');

const router = express.Router(); 

/**
 * 
 * @api {GET} /api/search?q= To get the JSON from text queries
 * @apiName Translate text queries to JSON
 * @apiGroup search
 * @apiVersion  1.0.0
 * 
 * 
 * @apiParam  {String} q The text query to be parsed
 * 
 * @apiSuccess (200) {object} The formatted JSON 
 *
 * @apiParamExample  {String} Request-Example:
 * {
 *     q : error OR info
 * }
 * 
 * 
 * @apiSuccessExample {object} Success-Response:
 * { "$or": ["error", "info"] }
 * 
 */

router.route('/')
  .get(validate(paramValidation.queryText), searchCtrl.parseTOJSON);

module.exports = router