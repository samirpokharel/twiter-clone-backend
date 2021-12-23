import * as auth from "../Controllers/AuthController";
import { protect } from "../Middleware/AuthChecker";
import { Router } from "express";

//initilize router
const router = Router();
// Routes...
router.post("/create-account", auth.create_account);
router.post("/login-account", auth.login_account);
router.get("/current-account", protect, auth.current_account);
router.put("/update-account", protect, auth.update_account);
router.delete("/delete-account", protect, auth.delete_account);

router.get("/conform-account", auth.conform_account);
router.post("/forgot-account-password", auth.forgot_account_password);
router.put("/reset-account-password", auth.reset_account_password);

export default router;
