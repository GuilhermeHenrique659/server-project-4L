import IService from "@common/service/IService";
import IPostRepository from "../../repository/IPostRepository";

class ListRecommendPostService implements IService {
    constructor (private readonly _postRepository: IPostRepository ) {}

    public async execute(data: { userId: string, skip: number, limit: number }): Promise<any> {
        const posts = await this._postRepository.listRecommendPost(data.userId, data.skip, data.limit);
        
        return posts
    }
}

export default ListRecommendPostService;