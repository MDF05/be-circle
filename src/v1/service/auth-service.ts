import { User as UserTypes, PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { loginDTO, UserLogin, UserToken } from "../DTO/login-dto";
import jwebtoken from "jsonwebtoken";
import dotenv from "dotenv";
import UserTypesExtends from "../types/user-ext-fullname";
dotenv.config();




const prisma = new PrismaClient();

class AuthService {
    async register(data: UserTypesExtends): Promise<UserTypes> {
        const { fullName, ...other } = data;
        const salt = 10;
        const hashPassword = await bcrypt.hash(other.password, salt);

        const UniqueEmail = await prisma.user.findUnique({ where: { email: other.email } });
        if (UniqueEmail) throw new Error("email has already been registered");

        const user = await prisma.user.create({
            data: {
                ...other,
                password: hashPassword,
                username : fullName,
                profile : {
                    create : {
                        fullName : fullName,
                    }
                }
            },
        });

        return user
    }

    async login(data: loginDTO): Promise<UserToken> {
        const { email, password } = data;

        const user = await prisma.user.findFirst({
            where: { OR : [{email}, {username : email}]}, include: {
                profile: {
                    include: {
                        _count: {
                            select: {
                                follower: true,
                                following: true,
                            }
                        }
                    }
                }
            }
        });



        if (!user) throw new Error(`User not found`);

        const match = await bcrypt.compare(password, user.password);
        if (!match) throw new Error(`Invalid credentials`);

        const { password: Password, ...otherUser } = user;

        const token = jwebtoken.sign(otherUser, process.env.JWTPASSWORD as string, { expiresIn: "1d" });

        return { user: otherUser, token };
    }


    async validateToken(token: string): Promise<UserTypes> {
        const decoded = jwebtoken.verify(token, process.env.JWTPASSWORD as string);
        return decoded as UserTypes
    }




}

export default new AuthService();
