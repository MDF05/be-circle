import { Request, Response, NextFunction } from "express";
import createError from "../utils/create-error";
import dotenv from "dotenv";

dotenv.config();

export const verifyCaptcha = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { captchaToken } = req.body;

        // Skip captcha if disabled in env or for testing (optional logic)
        if (process.env.SKIP_CAPTCHA === 'true') {
            return next();
        }

        if (!captchaToken) {
            return next(createError("Captcha token is required", 400));
        }

        const secretKey = process.env.VITE_SECRET_KEY_RECAPTCHA;
        // Note: User provided VITE_SECRET_KEY_RECAPTCHA in frontend env, 
        // but usually secret key is backend. I will use the one provided.
        // Ideally it should be named RECAPTCHA_SECRET_KEY in backend env.
        // I will check process.env.VITE_SECRET_KEY_RECAPTCHA or RECAPTCHA_SECRET_KEY.

        const finalSecret = process.env.RECAPTCHA_SECRET_KEY || process.env.VITE_SECRET_KEY_RECAPTCHA;

        if (!finalSecret) {
            console.warn("Recaptcha secret key not found.");
            return next(); // Or throw error depending on strictness
        }

        const verificationUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${finalSecret}&response=${captchaToken}`;

        const response = await fetch(verificationUrl, {
            method: "POST",
        });

        const data = await response.json();

        if (!data.success) {
            return next(createError("Captcha verification failed", 400));
        }

        next();
    } catch (err) {
        next(createError("Captcha verification error", 500));
    }
};
