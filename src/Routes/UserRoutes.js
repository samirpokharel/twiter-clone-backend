import * as userCtrl from "../Controllers/UserController";
import { protect } from "../Middleware/AuthChecker";
import { Router } from "express";

//initilize router
const router = Router();
// Routes...
router.post("/create-account", userCtrl.create_account);
router.get("/conform-account", userCtrl.conform_account);
router.post("/login-account", userCtrl.login_account);
router.get("/current-account", protect, userCtrl.current_account);
router.put("/update-account", protect, userCtrl.update_account);
router.post("/forgot-account-password", userCtrl.forgot_account_password);
router.put("/reset-account-password", userCtrl.reset_account_password);

export default router;
