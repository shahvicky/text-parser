const express = require('express');
const ReS = require('./../../global_functions').ReS;
const searchRoute = require('./search.route');
const router = express.Router();

router.get('/health-check', async (req, res) => {
  await setTimeout(() => {
    return ReS(res, {message:"OK"});
  }, 3000);
  
});

//the search route is mounted over /search
router.use('/search', searchRoute);

module.exports = router;
