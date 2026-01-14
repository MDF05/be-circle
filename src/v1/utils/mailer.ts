import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || "smtp.ethereal.email",
    port: parseInt(process.env.SMTP_PORT || "587"),
    secure: process.env.SECURE === "true", // true for 465, false for other ports
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
});

export const sendEmail = async (to: string, subject: string, text: string, html?: string) => {
    const info = await transporter.sendMail({
        from: `"Support Team" <${process.env.SMTP_USER}>`,
        to,
        subject,
        text,
        html,
    });

    console.log("Message sent: %s", info.messageId);
    return info;
};
