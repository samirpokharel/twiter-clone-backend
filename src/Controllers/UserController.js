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
