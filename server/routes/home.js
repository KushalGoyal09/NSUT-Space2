const express = require('express');
const getAllTweets = require('../collections/getAllTweets');
const getSingleTweet = require('../collections/getSingleTweet');
const postComment = require('../collections/postComment');
const like = require('../collections/like');
const router = express.Router();

router.get('/',getAllTweets);
router.get('/:id', getSingleTweet)
router.post('/:id/comment',postComment);
router.post('/:id/like', like); 

module.exports = router;