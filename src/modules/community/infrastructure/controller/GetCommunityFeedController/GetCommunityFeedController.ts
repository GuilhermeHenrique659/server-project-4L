import IController from "@common/controller/IController";
import { ControllerInput } from "@common/types/ControllerIO";
import { GetCommunityFeedRequestDTO } from "./GetCommuntiyFeedControllerDTO";
import Post from "@modules/post/domain/entity/Post";
import { injectable } from "tsyringe";
import ListPostInsideCommunityService from "@modules/post/domain/service/ListPostInsideCommunity/ListPostInsideCommunity";

@injectable()
class GetCommunityFeedController implements IController {
    constructor(private readonly _listPostInsideCommunityService: ListPostInsideCommunityService) { }

    public async handle(payload: ControllerInput<GetCommunityFeedRequestDTO>): Promise<Post[]> {
        const { user, data: { communityId, ...data } } = payload;
        const limit = data.limit ?? 3;
        const skip = data.page === 0 ? 0 : (data.page * limit);
        const userId = user?.id as string;

        return await this._listPostInsideCommunityService.execute({ userId, communityId, skip, limit });
    }
}

export default GetCommunityFeedController;