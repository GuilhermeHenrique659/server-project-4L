import Community from "@modules/community/domain/entity/Community";
import { CreateCommunityResponseDTO } from "../controller/CreateCommunityController/CreateCommunityControllerDTO";

class CommunityPresenter {
    static createCommunity({ admin, ...community}: Community): CreateCommunityResponseDTO {
        return {
                ...community,
                admin: {
                    id: admin.id,
                    name: admin.name,
                    avatar: admin.avatar,
                }
        }
    }
}

export default CommunityPresenter;