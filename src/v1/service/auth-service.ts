import { User as UserTypes, PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { loginDTO, UserLogin, UserToken } from "../DTO/login-dto";
import jwebtoken from "jsonwebtoken";
import dotenv from "dotenv";
import { v4 as uuidv4 } from 'uuid';
import redisClient from "../../config/redis";
import { sendEmail } from "../utils/mailer";
import UserTypesExtends from "../types/user-ext-fullname";
dotenv.config();

const prisma = new PrismaClient();

class AuthService {
  async register(data: UserTypesExtends & { captchaToken?: string }): Promise<UserTypes> {
    const { fullName, captchaToken, ...other } = data;
    const salt = 10;
    const hashPassword = await bcrypt.hash(other.password, salt);

    const UniqueEmail = await prisma.user.findUnique({ where: { email: other.email } });
    if (UniqueEmail) throw new Error("email has already been registered");

    const user = await prisma.user.create({
      data: {
        ...other,
        password: hashPassword,
      },
    });

    const profile = await prisma.profile.create({ data: { userId: user.id, username: fullName, fullName: fullName } });
    return user;
  }

  async login(data: loginDTO): Promise<UserToken> {
    const { email, password } = data;

    const user = await prisma.user.findUnique({
      where: { email },
      include: {
        profile: {
          include: {
            _count: {
              select: {
                follower: true,
                following: true,
              },
            },
          },
        },
      },
    });

    if (!user) throw new Error(`User not found`);

    const match = await bcrypt.compare(password, user.password);
    if (!match) throw new Error(`Invalid credentials`);

    const { password: Password, ...otherUser } = user;

    const token = jwebtoken.sign(otherUser, process.env.JWTPASSWORD as string, { expiresIn: "1d" });

    return { user: otherUser, token };
  }

  async validateToken(token: string): Promise<UserTypes | null> {
    const decoded = jwebtoken.verify(token, process.env.JWTPASSWORD as string);
    const user = await prisma.user.findUnique({
      where: { email: (decoded as UserTypes).email },
      include: {
        profile: {
          include: {
            _count: {
              select: {
                follower: true,
                following: true,
              },
            },
          },
        },
      },
    });
    return user;
  }

  async forgotPassword(email: string): Promise<void> {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      // For security, don't reveal if user doesn't exist, but maybe log it
      return;
    }

    const token = uuidv4();
    // Save token to Redis with 15 minutes expiration (900 seconds)
    // Key: forgot-password:{token} -> Value: email
    await redisClient.set(`forgot-password:${token}`, email, "EX", 900);

    const resetLink = `${process.env.FRONTEND_URL || 'http://localhost:5173'}/reset-password?token=${token}`;

    await sendEmail(
      email,
      "Reset Your Password",
      `Click here to reset your password: ${token}`,
      `<p>Click <a href="${resetLink}">here</a> to reset your password.</p>`
    );
  }

  async resetPassword(token: string, newPassword: string): Promise<void> {
    const email = await redisClient.get(`forgot-password:${token}`);
    if (!email) {
      throw new Error("Invalid or expired token");
    }

    const salt = 10;
    const hashPassword = await bcrypt.hash(newPassword, salt);

    await prisma.user.update({
      where: { email },
      data: { password: hashPassword },
    });

    // Delete token after use
    await redisClient.del(`forgot-password:${token}`);
  }
}

export default new AuthService();
