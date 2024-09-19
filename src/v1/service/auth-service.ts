import { User as UserTypes, PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { loginDTO, UserLogin } from "../DTO/login-dto";
import jwebtoken from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();



const prisma = new PrismaClient();

class AuthService {
    async register(data: UserTypes): Promise<UserTypes> {
        const { email, password } = data;
        const salt = 10;
        const hashPassword = await bcrypt.hash(password, salt);

        const UniqueEmail = await prisma.user.findUnique({ where: { email } });
        if (UniqueEmail) throw new Error("email has already been registered");

        return await prisma.user.create({
            data: {
                ...data,
                password: hashPassword,
            },
        });
    }

    async login(data: loginDTO): Promise<UserLogin> {
        const { email, password } = data;

        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) throw new Error(`User not found`);

        const match = await bcrypt.compare(password, user.password);
        if (!match) throw new Error(`Invalid credentials`);

        const { password: Password, ...otherUser } = user;

        const token = jwebtoken.sign(otherUser, process.env.JWTPASSWORD as string);

        return { user: otherUser, token };
    }
}

export default new AuthService();
