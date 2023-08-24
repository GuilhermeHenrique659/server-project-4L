import IService from "@common/service/IService";
import IPostRepository from "../../repository/IPostRepository";
import Post from "../../entity/Post";

class ListRecommendPostService implements IService {
    constructor (private readonly _postRepository: IPostRepository ) {}

    public async execute(data: { userId: string, skip: number, limit: number, useAlgorithmic?: boolean }): Promise<Post[]> {
        const posts = await this._postRepository.listRecommendPost(data.userId, data.skip, data.limit, data.useAlgorithmic);
        
        return posts
    }
}

export default ListRecommendPostService;