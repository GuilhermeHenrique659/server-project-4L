import User from "../entity/User";
import UserAvatar from "../entity/UserAvatar";
import UserTags from "../entity/UserTags";
import UserPosted from "../entity/UserPosted";
import UserCommunity from "../entity/UserCommunity";

interface IUserRepository {
    findByEmail(email: string): Promise<User | undefined>;
    findById(id: string): Promise<User | undefined>;
    findByIdWithAvatar(id: string): Promise<User | undefined>;
    findUserTag(userId: string, tagId: string): Promise<boolean>;
    hasFollowingCommunity(userCommunity: UserCommunity): Promise<boolean>;
    save(user: User): Promise<User>;
    saveTag(userTags: UserTags): Promise<void>;
    saveAvatar(userAvatar: UserAvatar): Promise<void>;
    saveUserPost(userPosts: UserPosted): Promise<void>;
    saveUserCommunity(userCommunity: UserCommunity): Promise<void>
    removeAvatar(userId: string): Promise<void>;
}

export default IUserRepository;