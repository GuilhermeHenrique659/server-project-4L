import IController from "@common/controller/IController";
import { ControllerInput } from "@common/types/ControllerIO";
import UnfollowCommunityService from "@modules/user/domain/service/UnfollowCommunity/UnfollowCommunityService";
import { injectable } from "tsyringe";

@injectable()
class UnfollowCommunityController implements IController {
    constructor(private readonly _unfollowCommunityService: UnfollowCommunityService) { }

    public async handle(payload: ControllerInput<{ communityId: string }>): Promise<boolean> {
        const userId = payload.user?.id as string;
        const { communityId } = payload.data;

        await this._unfollowCommunityService.execute({ communityId, userId });

        return true;
    }
}

export default UnfollowCommunityController;