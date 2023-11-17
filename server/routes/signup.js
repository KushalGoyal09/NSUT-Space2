const express = require('express');
const signup = require('../collections/signup');
const router = express.Router();

router.route('/').post(signup)

module.exports = router;