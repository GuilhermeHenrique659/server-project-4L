import IController from "@common/controller/IController";
import { ControllerInput } from "@common/types/ControllerIO";
import Community from "@modules/community/domain/entity/Community";
import GetCommunityDataService from "@modules/community/domain/service/GetCommunityData/GetCommunityDataService";
import { injectable } from "tsyringe";

@injectable()
class GetCommunityDataController implements IController {
    constructor(private readonly _getCommunityDataService: GetCommunityDataService) { }

    public async handle(payload: ControllerInput<{ communityId: string }>): Promise<Community> {
        const { communityId } = payload.data;
        const userId = payload.user?.id as string
        const community = await this._getCommunityDataService.execute({ communityId, userId });

        return community
    }
}

export default GetCommunityDataController;