const express = require('express');
const postTweet = require('../collections/postTweet');
const generatePost = require('../collections/generatePost');
const router = express.Router();


router.route('/').post(postTweet);
router.route('/generate').post(generatePost);

module.exports = router;