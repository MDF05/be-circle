import { NextFunction, Request, Response } from "express";
import AuthService from "../service/auth-service";
import createError from "../utils/create-error";
import succesResponse from "../utils/succes-response";
import dotenv from "dotenv";
import { registerSchema } from "../schema/register-schema";
import { loginSchema } from "../schema/login-schema";

dotenv.config();

class AuthController {
  async register(req: Request, res: Response, next: NextFunction) {
    /*      #swagger.requestBody = {
              required : true,
              content : {
                  "application/json" : {
                      schema : {
                         $ref : "#/components/schemas/registerDTO"
                      }
                  }
              }
          }
        */

    try {
      const result = await registerSchema.safeParseAsync(req.body);
      if (!result.success) throw new Error(result.error?.issues[0].message);
      const { password, ...user } = await AuthService.register(req.body);
      succesResponse(res, "user has been registered successfully", 201, user);
    } catch (err: unknown) {
      if (err instanceof Error) next(createError(err.message, 401));
      else next(createError("unknown error", 520));
    }
  }

  async validateToken(req: Request, res: Response, next: NextFunction) {
    /*      #swagger.requestBody = {
              required : true,
              content : {
                  "application/json" : {
                      schema : {
                         $ref : "#/components/schemas/registerDTO"
                      }
                  }
              }
          }
        */

    try {
      const user = await AuthService.validateToken(req.params.token);
      if (!user) throw new Error("Invalid token");
      const { password, ...details } = user;

      succesResponse(res, "token is validated", 201, details);
    } catch (err: unknown) {
      if (err instanceof Error) next(createError(err.message, 401));
      else next(createError("unknown error", 520));
    }
  }

  async login(req: Request, res: Response, next: NextFunction) {
    /*  #swagger.requestBody = {
          required : true,
          content : {
              "application/json" : {
                  schema : {
                     $ref : "#/components/schemas/loginDTO"
                  }
              }
          }
      }
      */
    try {
      const user = await AuthService.login(req.body);
      const result = await loginSchema.safeParseAsync(req.body);
      if (!result.success) throw new Error(result.error?.issues[0].message);

      succesResponse(res, "user succesfully login", 201, user);
    } catch (err: unknown) {
      if (err instanceof Error) next(createError(err.message, 401));
      else next(createError("unknown error", 520));
    }
  }

  async forgotPassword(req: Request, res: Response, next: NextFunction) {
    try {
      const { email } = req.body;
      if (!email) throw new Error("Email is required");

      await AuthService.forgotPassword(email);
      // Always return success even if email doesn't exist to prevent enumeration
      succesResponse(res, "If the email is registered, a reset link has been sent.", 200, {});
    } catch (err: unknown) {
      if (err instanceof Error) next(createError(err.message, 401));
      else next(createError("unknown error", 520));
    }
  }

  async resetPassword(req: Request, res: Response, next: NextFunction) {
    try {
      const { token, newPassword } = req.body;
      if (!token || !newPassword) throw new Error("Token and new password are required");

      await AuthService.resetPassword(token, newPassword);
      succesResponse(res, "Password has been reset successfully", 200, {});
    } catch (err: unknown) {
      if (err instanceof Error) next(createError(err.message, 400));
      else next(createError("unknown error", 520));
    }
  }

  async google(req: Request, res: Response, next: NextFunction) {
    try {
      const GOOGLE_CALLBACK_URL = "http://localhost:3000/api/v1/google/callback";
      const GOOGLE_OAUTH_URL = process.env.GOOGLE_OAUTH_URL;
      const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;

      const GOOGLE_OAUTH_SCOPES = ["https%3a//www.googleapis.com/auth/userinfo.email", "https%3a//www.googleapis.com/auth/userinfo.profile"];

      const state = "google"; // ! pesan/state yang akan di kirimkan
      const scopes = GOOGLE_OAUTH_SCOPES.join(" ");
      const GOOGLE_OAUTH_CONSENT_SCREEN_URL = `${GOOGLE_OAUTH_URL}?client_id=${GOOGLE_CLIENT_ID}&redirect_uri=${GOOGLE_CALLBACK_URL}&access_type=offline&response_type=code&state=${state}&scope=${scopes}`;
      res.redirect(GOOGLE_OAUTH_CONSENT_SCREEN_URL);
    } catch (err: unknown) {
      if (err instanceof Error) next(createError(err.message, 401));
      else next(createError("unknown error", 520));
    }
  }

  async googleCallback(req: Request, res: Response, next: NextFunction) {
    try {
      const { code } = req.query;
      const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
      const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
      const GOOGLE_ACCESS_TOKEN_URL = process.env.GOOGLE_ACCESS_TOKEN_URL;

      const data = {
        code,

        client_id: GOOGLE_CLIENT_ID,

        client_secret: GOOGLE_CLIENT_SECRET,

        redirect_uri: "http://localhost:3000/api/v1/google/callback",

        grant_type: "authorization_code",
      };

      const response = await fetch(GOOGLE_ACCESS_TOKEN_URL as string, {
        method: "POST",

        body: JSON.stringify(data),
      });

      const access_token_data = await response.json();
      succesResponse(res, "successfully granted access token", 200, access_token_data);
    } catch (err: unknown) {
      if (err instanceof Error) next(createError(err.message, 401));
      else next(createError("unknown error", 520));
    }
  }
}

export default new AuthController();
