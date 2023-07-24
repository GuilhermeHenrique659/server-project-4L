import User from "../entity/User";
import UserAvatar from "../entity/UserAvatar";
import UserTags from "../entity/UserTags";
import UserPosted from "../entity/UserPosted";

interface IUserRepository {
    findByEmail(email: string): Promise<User | undefined>;
    findById(id: string): Promise<User | undefined>;
    findUserTag(userId: string, tagId: string): Promise<boolean>;
    save(user: User): Promise<User>;
    saveTag(userTags: UserTags): Promise<void>;
    saveAvatar(userAvatar: UserAvatar): Promise<void>;
    saveUserPost(userPosts: UserPosted): Promise<void>;
    removeAvatar(userId: string): Promise<void>;
}

export default IUserRepository;