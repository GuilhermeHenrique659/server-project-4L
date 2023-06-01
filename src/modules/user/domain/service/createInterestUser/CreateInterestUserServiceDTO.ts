import Tag from "@modules/tag/domain/entity/Tag";
import User from "../../entity/User";

export type CreateInterestUserServiceDTO = {
    tag: Tag;
    user: User;
}