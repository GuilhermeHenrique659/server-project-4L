import IService from "@common/service/IService";
import IPostRepository from "../../repository/IPostRepository";

class ListPostInsideCommunityService implements IService {
    constructor (private readonly _postRepository: IPostRepository ) {}

    public async execute(data: { userId: string, skip: number, limit: number, communityId: string }): Promise<any> {
        const posts = await this._postRepository.listPostCommunity(data.userId, data.skip, data.limit, data.communityId);
        
        return posts;
    }
}

export default ListPostInsideCommunityService;