import Tag from "@modules/tag/domain/entity/Tag";
import User from "../entity/User";
import File from "@modules/file/domain/entity/File";
import Post from "@modules/post/domain/entity/Post";

interface IUserRepository {
    findByEmail(email: string): Promise<User | undefined>;
    findById(id: string): Promise<User | undefined>;
    save(user: User): Promise<User>;
    saveTag(user: User, tag: Tag): Promise<void>;
    saveAvatar(user: User, file: File): Promise<void>;
    saveUserPost(user: User, post: Post): Promise<void>;
    removeAvatar(userId: string): Promise<void>;
}

export default IUserRepository;