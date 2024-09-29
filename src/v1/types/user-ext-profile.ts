import { $Enums, Profile } from '@prisma/client';


export default interface UserExtProfile {
    id: string;
    email: string;
    password: string;
    socialConnectiion: boolean;
    role: $Enums.UserRole;
    createdAt: Date;
    updateAt: Date;
    threadId: string | null;
    profile: Profile
};