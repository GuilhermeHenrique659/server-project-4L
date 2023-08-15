import Tag from "@modules/tag/domain/entity/Tag";
import Community from "../../entity/Community"

export type UpdateCommunityTagServiceDTO = {
    community: Community;
    tags: Tag[];
}