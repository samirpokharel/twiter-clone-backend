import asyncHandler from "../Middleware/AsyncHandler";
import ErrorResponse from "../Utils/ErrorResponse";
import Post from "../Models/Post";
import AdvanceResponse from "../Middleware/AdvanceResponse";
import User from "../Models/User";

/**
 * @title Search user
 * @route GET /api/v1/users/
 * @description search users
 */
exports.search_user = asyncHandler(async (req, res, next) => {
  var searchObj = req.query;

  if (req.query.q !== undefined) {
    searchObj = {
      $or: [
        { displayName: { $regex: req.query.q, $options: "i" } },
        { username: { $regex: req.query.q, $options: "i" } },
      ],
    };
  }

  const users = await User.find(searchObj);
  return res.status(200).send({ success: true, data: users });
});

/**
 * @title Follow user
 * @route PUT /api/v1/users/:userId/follow
 * @description flutter user
 */
exports.follow_user = asyncHandler(async (req, res, next) => {
  const userId = req.params.userId;
  const user = await User.findById(userId);
  if (!user) return new ErrorResponse("User Not Found", 404);
  const isFollowing = user.followers && user.followers.includes(req.user.id);
  const option = isFollowing ? "$pull" : "$addToSet";

  await User.findByIdAndUpdate(
    req.user.id,
    { [option]: { following: userId } },
    { new: true }
  );
  await User.findByIdAndUpdate(userId, {
    [option]: { followers: req.user.id },
  });

  return res.sendStatus(200);
});

/**
 * @title get user following
 * @route GET /api/v1/users/:userId/following
 * @description get user following
 */
exports.user_following = asyncHandler(async (req, res, next) => {
  const userId = req.params.userId;
  let user = User.findById(userId);
  if (!user) return new ErrorResponse("User Not Found", 404);
  user = await user.populate("following");
  // user = user.populate("following", "following");

  return res.status(200).send({ success: true, data: user.following });
});

/**
 * @title get user follower
 * @route GET /api/v1/users/:userId/follower
 * @description get user followers
 */
exports.user_followers = asyncHandler(async (req, res, next) => {
  const userId = req.params.userId;
  let user = User.findById(userId);
  if (!user) return new ErrorResponse("User Not Found", 404);
  user = await user.populate("followers");
  // user = user.populate("followers", "followers");

  return res.status(200).send({ success: true, data: user.followers });
});

/**
 * @title Upload profile picture
 * @route POST /api/v1/users/user-profile-picture
 * @description Update profile picture
 */
exports.user_profile_picture = asyncHandler(async (req, res, next) => {
  //TODO: implement
});

/**
 * @title Upload Cover Photo
 * @route POST /api/v1/users/user-cover-picture
 * @description Update cover picture
 */
exports.user_cover_picture = asyncHandler(async (req, res, next) => {
  //TODO: implement
});
