import IController from "@common/controller/IController";
import { ControllerInput, ControllerOutput } from "@common/types/ControllerIO";
import Community from "@modules/community/domain/entity/Community";
import GetFollowingCommunityService from "@modules/user/domain/service/GetFollowingCommunity/GetFollowingCommunityService";
import { injectable } from "tsyringe";

@injectable()
class GetFollowingCommunityController implements IController {
    constructor(private readonly _getFollowingCommunityService: GetFollowingCommunityService) { }

    public async handle(payload: ControllerInput<void>): Promise<ControllerOutput<Community[]>> {
        const userId = payload.user?.id as string;

        return await this._getFollowingCommunityService.execute({ userId });
    }
}

export default GetFollowingCommunityController;