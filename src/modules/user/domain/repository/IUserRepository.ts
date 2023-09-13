import User from "../entity/User";
import UserAvatar from "../entity/UserAvatar";
import UserTags from "../entity/UserTags";
import UserPosted from "../entity/UserPosted";
import UserCommunity from "../entity/UserCommunity";
import IEdge from "@common/database/datasource/types/IEdge";

interface IUserRepository {
    findByEmail(email: string): Promise<User | undefined>;
    findById(id: string): Promise<User | undefined>;
    findByIdWithAvatar(id: string): Promise<User | undefined>;
    findByIdCompleteData(id: string): Promise<User | undefined>;
    findUserTag(userId: string, tagId: string): Promise<boolean>;
    hasFollowingCommunity(userCommunity: UserCommunity): Promise<boolean>;
    hasOwneship(userOwner: IEdge): Promise<boolean>;
    save(user: User): Promise<User>;
    saveTag(userTags: UserTags): Promise<void>;
    saveAvatar(userAvatar: UserAvatar): Promise<void>;
    saveUserPost(userPosts: UserPosted): Promise<void>;
    saveUserCommunity(userCommunity: UserCommunity): Promise<void>
    removeAvatar(userId: string): Promise<void>;
    removeCommunity(userCommunity: UserCommunity): Promise<void>;
}

export default IUserRepository;