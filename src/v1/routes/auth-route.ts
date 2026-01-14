import { Router } from "express";
import AuthController from "../controllers/auth-controller";

const AuthRoute = Router();

AuthRoute.get("/validate-token/:token", AuthController.validateToken);
import { verifyCaptcha } from "../middleware/captcha-middleware";

AuthRoute.post("/register", verifyCaptcha, AuthController.register);
AuthRoute.post("/login", verifyCaptcha, AuthController.login);
AuthRoute.get("/google", AuthController.google);
AuthRoute.get("/google/callback", AuthController.googleCallback);
AuthRoute.post("/forgot-password", AuthController.forgotPassword);
AuthRoute.post("/reset-password", AuthController.resetPassword);

export default AuthRoute;
