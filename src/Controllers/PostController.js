import asyncHandler from "../Middleware/AsyncHandler";
import ErrorResponse from "../Utils/ErrorResponse";
import Post from "../Models/Post";
import AdvanceResponse from "../Middleware/AdvanceResponse";
import User from "../Models/User";

/**
 * @title Create post
 * @route POST /api/v1/posts/
 * @description create post
 */
exports.create_post = asyncHandler(async (req, res, next) => {
  const postObj = { ...req.body, author: req.user.id };
  const post = await Post.create(postObj);
  return res.status(200).send({ success: true, data: post });
});

/**
 * @title Get posts
 * @route GET /api/v1/posts
 * @description get posts
 */
exports.get_posts = asyncHandler(async (req, res, next) => {
  return res.status(200).send(res.advancedResults);
});

/**
 * @title Like post
 * @route PUT /api/v1/posts/:postId/like
 * @description Like post
 */
exports.like_post = asyncHandler(async (req, res, next) => {
  const userId = req.user.id;
  const postId = req.params.postId;
  const isLiked = req.user.likes.includes(postId);

  var option = isLiked ? "$pull" : "$addToSet";
  // update user likes
  await User.findByIdAndUpdate(
    userId,
    { [option]: { likes: postId } },
    { new: true }
  );
  // update posts likes
  await Post.findByIdAndUpdate(
    postId,
    { [option]: { likes: userId } },
    { new: true }
  );
  return res.sendStatus(200);
});

/**
 * @title Repost
 * @route POST /api/v1/posts/:postId/repost
 * @description Like post
 */
exports.retweet_post = asyncHandler(async (req, res, next) => {
  const userId = req.user.id;
  const postId = req.params.postId;
  /// If user has already retweeted delete that post
  /// If your has not retweeted add new post with retweet data and own user id as author id

  // first assume user has already retweeted => remove post
  // removedPost == null ? not retweeted : retweeted
  // not retweeted => create new post
  // retweeted => remove that tweet  [already removed] firstly
  const deletedPost = await Post.findOneAndDelete({
    author: userId,
    retweet: postId,
  });
  var option = deletedPost != null ? "$pull" : "$addToSet";
  //repost with own id as author id and retweetdata
  var repost = deletedPost;

  if (repost == null) {
    repost = await Post.create({ author: userId, retweet: postId });
  }
  // Update user retweets
  await User.findByIdAndUpdate(
    userId,
    { [option]: { retweets: repost.id } },
    { new: true }
  );
  // Update Post retweets
  await Post.findByIdAndUpdate(
    postId,
    { [option]: { retweets: userId } },
    { new: true }
  );

  return res.sendStatus(200);
});
