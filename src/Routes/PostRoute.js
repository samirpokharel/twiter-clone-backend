import * as postCtrl from "../Controllers/PostController";
import { protect } from "../Middleware/AuthChecker";
import { Router } from "express";
import advancedResults from "../Middleware/AdvanceResponse";
import Post from "../Models/Post";

//initilize router
const router = Router();
// Routes...
router.get(
  "/",
  advancedResults(Post, "author retweet replyTo"),
  postCtrl.get_posts
);
router.post("/", protect, postCtrl.create_post);
router.put("/:postId/like", protect, postCtrl.like_post);
router.put("/:postId/retweet", protect, postCtrl.retweet_post);


export default router;
