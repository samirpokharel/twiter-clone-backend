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
