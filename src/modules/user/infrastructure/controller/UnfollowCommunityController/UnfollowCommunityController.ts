import IController from "@common/controller/IController";
import { ControllerInput } from "@common/types/ControllerIO";
import UserServiceFactory from "@modules/user/domain/service/UserServiceFactory";

class UnfollowCommunityController implements IController {
    constructor (private readonly userServices: UserServiceFactory) {}

    public async handle(payload: ControllerInput<{ communityId: string }>): Promise<boolean> {
        const userId = payload.user?.id as string;
        const { communityId } = payload.data;

        await this.userServices.getUnfollowCommunity().execute({ communityId, userId });

        return true;
    }
}

export default UnfollowCommunityController;