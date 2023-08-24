import IController from "@common/controller/IController";
import { ControllerInput } from "@common/types/ControllerIO";
import { FollowCommunityControllerDTO } from "./FollowCommunityControllerDTO";
import { injectable } from "tsyringe";
import FollowCommunityService from "@modules/user/domain/service/FollowCommunity/FollowComunityService";

@injectable()
class FollowCommunityController implements IController {
    constructor(private readonly _followCommunityService: FollowCommunityService) { }

    public async handle(payload: ControllerInput<FollowCommunityControllerDTO>): Promise<boolean> {
        const communityId = payload.data.communityId;
        const userId = payload.user?.id as string;

        await this._followCommunityService.execute({ communityId, userId });

        return true;
    }
}

export default FollowCommunityController;