import User from "../entity/User";
import UserAvatar from "../entity/UserAvatar";
import UserTags from "../entity/UserTags";
import UserPosts from "../entity/UserPosts";

interface IUserRepository {
    findByEmail(email: string): Promise<User | undefined>;
    findById(id: string): Promise<User | undefined>;
    save(user: User): Promise<User>;
    saveTag(userTags: UserTags): Promise<void>;
    saveAvatar(userAvatar: UserAvatar): Promise<void>;
    saveUserPost(userPosts: UserPosts): Promise<void>;
    removeAvatar(userId: string): Promise<void>;
}

export default IUserRepository;