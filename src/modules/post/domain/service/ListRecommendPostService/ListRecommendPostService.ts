import IService from "@common/service/IService";
import IPostRepository from "../../repository/IPostRepository";
import Post from "../../entity/Post";
import { inject, injectable } from "tsyringe";
import { Repository } from "@common/emun/InjectionsEmun";

@injectable()
class ListRecommendPostService implements IService {
    constructor(@inject(Repository.PostRepository) private readonly _postRepository: IPostRepository) { }

    public async execute(data: { userId: string, skip: number, limit: number, useAlgorithmic?: boolean }): Promise<Post[]> {
        const posts = await this._postRepository.listRecommendPost(data.userId, data.skip, data.limit, data.useAlgorithmic);

        return posts
    }
}

export default ListRecommendPostService;