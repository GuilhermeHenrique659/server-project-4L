import IController from "@common/controller/IController";
import { ControllerInput } from "@common/types/ControllerIO";
import Community from "@modules/community/domain/entity/Community";
import CommunityServiceFactory from "@modules/community/domain/service/CommunityServiceFactory";

class GetCommunityDataController implements IController {
    constructor (private readonly communityServiceFactory: CommunityServiceFactory) {}

    public async handle(payload: ControllerInput<{communityId: string}>): Promise<Community> {
        const { communityId } = payload.data;
        const userId = payload.user?.id as string
        const community = await this.communityServiceFactory.getCommunityData().execute({ communityId, userId });
        
        return community
    }
}

export default GetCommunityDataController;