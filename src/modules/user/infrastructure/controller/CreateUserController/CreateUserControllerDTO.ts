import Tag from "@modules/tag/domain/entity/Tag";
import User from "@modules/user/domain/entity/User";

export type CreateUserControllerDTO = Omit<User, 'id' | 'label'> & {
    tags?: Partial<Tag[]>;
}