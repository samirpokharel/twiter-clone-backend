import * as userCtrl from "../Controllers/UserController";
import { protect } from "../Middleware/AuthChecker";
import { Router } from "express";
import advancedResults from "../Middleware/AdvanceResponse";
import Post from "../Models/Post";

//initilize router
const router = Router();
// Routes...

router.get("/search", userCtrl.search_user);
router.put("/:userId/follow", protect, userCtrl.follow_user);
router.get("/:userId/following", userCtrl.user_following);
router.get("/:userId/followers", userCtrl.user_followers);
router.get(
  "/:userId/user-profile-picture",
  protect,
  userCtrl.user_profile_picture
);
router.get("/:userId/user-cover-picture", protect, userCtrl.user_cover_picture);

export default router;
