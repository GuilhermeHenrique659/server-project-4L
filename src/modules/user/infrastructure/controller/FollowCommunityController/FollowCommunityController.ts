import IController from "@common/controller/IController";
import { ControllerInput } from "@common/types/ControllerIO";
import UserServiceFactory from "@modules/user/domain/service/UserServiceFactory";
import { FollowCommunityControllerDTO } from "./FollowCommunityControllerDTO";

class FollowCommunityController implements IController {
    constructor (private readonly userServiceFactory: UserServiceFactory){}

    public async handle(payload: ControllerInput<FollowCommunityControllerDTO>): Promise<boolean> {
        const communityId = payload.data.communityId;
        const userId = payload.user?.id as string;
        await this.userServiceFactory.getFollowCommunity().execute({communityId, userId});

        return true;
    }
}

export default FollowCommunityController;