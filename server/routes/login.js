const express = require('express'); 
const login = require('../collections/login');
const router = express.Router();


router.post('/',login)

module.exports = router;