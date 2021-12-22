import * as postCtrl from "../Controllers/PostController";
import { protect } from "../Middleware/AuthChecker";
import { Router } from "express";
import advancedResults from "../Middleware/AdvanceResponse";
import Post from "../Models/Post";

//initilize router
const router = Router();
// Routes...
router.get("/", advancedResults(Post), postCtrl.get_tweets);
router.post("/", protect, postCtrl.create_tweet);

export default router;
