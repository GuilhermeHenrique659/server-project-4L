import Tag from "@modules/tag/domain/entity/Tag";
import User from "../entity/User";

interface IUserRepository {
    findByEmail(email: string): Promise<User | undefined>;
    save(user: User): Promise<User>;
    saveTag(user: User, tag: Tag): Promise<void>;
}

export default IUserRepository;