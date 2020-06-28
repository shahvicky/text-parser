const express = require('express');
const validate = require('express-validation');
const paramValidation = require('../../config/param-validation');
const searchCtrl = require('../controllers/search.controller');

const router = express.Router(); 

router.route('/')
  .get(validate(paramValidation.queryText), searchCtrl.parseTOJSON);

module.exports = router