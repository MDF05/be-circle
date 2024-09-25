import { User } from "@prisma/client";

export interface loginDTO {
    email: string,
    password: string
}


export interface UserLogin {
    profile: {
        id: string;
        fullName: string;
        username: string;
        image: string | null;
    };
    id: string;
    email: string;
    socialConnectiion: boolean;
    createdAt: Date;
    updateAt: Date;
    threadId: string | null;
}


export interface UserToken {
    user: Omit<User, "password">
    token: string
}

