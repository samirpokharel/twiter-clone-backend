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

export default router;
