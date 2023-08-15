import Community from "@modules/community/domain/entity/Community";
import { CreateCommunityResponseDTO } from "../controller/CreateCommunityController/CreateCommunityControllerDTO";

class CommunityPresenter {
    static createCommunity({ name, description, cover, tags, avatar, admin}: Community): CreateCommunityResponseDTO {
        return {
            community: {
                name,
                description,
                cover,
                avatar,
                tags,
                admin: {
                    id: admin.id,
                    name: admin.name,
                    avatar: admin.avatar,
                }
            }
        }
    }
}

export default CommunityPresenter;