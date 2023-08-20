import IController from "@common/controller/IController";
import { ControllerInput, ControllerOutput } from "@common/types/ControllerIO";
import Community from "@modules/community/domain/entity/Community";
import UserServiceFactory from "@modules/user/domain/service/UserServiceFactory";

class GetFollowingCommunityController implements IController {
    constructor (private readonly userServicesFactory: UserServiceFactory) {}

    public async handle(payload: ControllerInput<void>): Promise<ControllerOutput<Community[]>> {
        const userId = payload.user?.id as string;

        return await this.userServicesFactory.getFollowingCommunity().execute({ userId });
    }
}

export default GetFollowingCommunityController;