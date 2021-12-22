import asyncHandler from "../Middleware/AsyncHandler";
import ErrorResponse from "../Utils/ErrorResponse";
import Post from "../Models/Post";
import AdvanceResponse from "../Middleware/AdvanceResponse";

/**
 * @title Create Tweet
 * @route POST /api/v1/tweets/
 * @description create tweet
 */
exports.create_tweet = asyncHandler(async (req, res, next) => {
  const postObj = { ...req.body, author: req.user.id };
  const post = await Post.create(postObj);
  return res.status(200).send({ success: true, data: post });
});

/**
 * @title Get Tweets
 * @route GET /api/v1/tweets
 * @description get tweets
 */
exports.get_tweets = asyncHandler(async (req, res, next) => {
  return res.status(200).send(res.advancedResults);
});
