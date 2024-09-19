import { Post as PostTypes, PrismaClient } from "@prisma/client"


const prisma = new PrismaClient()

class PostService {
    async create(data: PostTypes): Promise<PostTypes> {
        const newPost = await prisma.post.create({ data })
        return newPost
    }

    async findMany(): Promise<PostTypes[]> {

        const posts = await prisma.post.findMany()
        return posts
    }

    async findUnique(id: string): Promise<PostTypes> {
        const post = await prisma.post.findUnique({ where: { id: id } })
        if (!post) throw new Error("no post found")

        return post
    }

    async post(data: PostTypes): Promise<PostTypes> {
        const post = await prisma.post.create({ data })

        return post
    }

    async update(id: string, data: PostTypes): Promise<PostTypes> {
        const updatePost = await prisma.post.update({ where: { id: id }, data })

        return updatePost
    }


    // async updateMany(id: string[], data: PostTypes[]): Promise<PostTypes> {
    //     const updatePost = await prisma.post.update({ where: { id: {} }, data })

    //     return updatePost
    // }

    async deleteOne(id: string): Promise<PostTypes> {
        const deletePost = await prisma.post.delete({ where: { id } })
        return deletePost
    }

    async deleteMany(id: string[]): Promise<any> {
        const deleteMany = await prisma.post.deleteMany({ where: { id: { in: id } } })

        return deleteMany
    }
}


export default new PostService()