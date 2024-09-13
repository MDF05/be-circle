import { PrismaClient, User as UserTypes } from "@prisma/client";

const prisma = new PrismaClient();


class User {

    async find(id: string): Promise<UserTypes> {
        const user = await prisma.user.findUnique({ where: { id } })
        if (!user) {
            throw new Error("User not found")
        }
        return user
    }

    async findMany(): Promise<UserTypes[]> {
        const user = await prisma.user.findMany()
        return user
    }

    async create(data: UserTypes): Promise<UserTypes> {
        const user = await prisma.user.create({ data })
        return user
    }

}


export default new User()
