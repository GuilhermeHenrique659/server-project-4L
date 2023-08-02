import Community from "@modules/community/domain/entity/Community";
import { CreateCommunityResponseDTO } from "../controller/CreateCommunityController/CreateCommunityControllerDTO";

class CommunityPresenter {
    static createCommunity({ name, description, admin}: Community): CreateCommunityResponseDTO {
        return {
            community: {
                name,
                description,
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