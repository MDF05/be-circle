import { Thread as ThreadsTypes, PrismaClient } from "@prisma/client"


const prisma = new PrismaClient()

class ThreadService {
    async create(data: ThreadsTypes,): Promise<ThreadsTypes> {

        const dataThread: ThreadsTypes = { ...data }
        const newPost = await prisma.thread.create({ data: dataThread })
        return newPost
    }


    async findMany(): Promise<ThreadsTypes[]> {

        const posts = await prisma.thread.findMany({
            where: { threadId: null },
            orderBy: { createdAt: 'desc' },
            include: {
                profile: {
                    select: { id: true, username: true, image: true, fullName: true }
                },
                _count: {
                    select: { like: true, replies: true }
                }

            }
        })
        return posts
    }

    async findUnique(id: string): Promise<ThreadsTypes> {
        const thread = await prisma.thread.findUnique({
            where: { id: id }, include: {
                profile: true, replies: {
                    orderBy: { createdAt: 'desc' },
                    include: {
                        profile: true,
                        _count: {
                            select: { like: true, replies: true }
                        }
                    },
                },
                _count: {
                    select: { like: true, replies: true }
                }
            }
        })
        if (!thread) throw new Error("no thread found")

        return thread
    }

    async thread(data: ThreadsTypes): Promise<ThreadsTypes> {
        const thread = await prisma.thread.create({ data })

        return thread
    }

    async update(id: string, data: ThreadsTypes): Promise<ThreadsTypes> {
        const updatePost = await prisma.thread.update({ where: { id: id }, data })

        return updatePost
    }


    // async updateMany(id: string[], data: ThreadsTypes[]): Promise<ThreadsTypes> {
    //     const updatePost = await prisma.thread.update({ where: { id: {} }, data })

    //     return updatePost
    // }

    async deleteOne(id: string): Promise<ThreadsTypes> {
        const deletePost = await prisma.thread.delete({ where: { id } })
        return deletePost
    }

    async deleteMany(id: string[]): Promise<any> {
        const deleteMany = await prisma.thread.deleteMany({ where: { id: { in: id } } })

        return deleteMany
    }
}


export default new ThreadService()