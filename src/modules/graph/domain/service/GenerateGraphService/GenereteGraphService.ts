import IService from "@common/service/IService";
import { IGraphRepository } from "../../repository/IGraphRepository";
import Graph from "../../entity/Graph";
import UserTags from "@modules/user/domain/entity/UserTags";
import User from "@modules/user/domain/entity/User";
import Tag from "@modules/tag/domain/entity/Tag";
import Post from "@modules/post/domain/entity/Post";
import PostTags from "@modules/post/domain/entity/PostTags";
import UserPosted from "@modules/user/domain/entity/UserPosted";
import UserLiked from "@modules/user/domain/entity/UserLiked";


class GenerateGraphService implements IService {
    constructor (private readonly _graphRepository: IGraphRepository ) {}

    public async execute(data: { name: string }): Promise<Graph> {
        const { name } = data

        const relations = [
            new UserTags(new User({}), new Tag({})),
            new UserPosted(new User({}), new Post({})),
            new UserLiked(new User({}), new Post({})),
            new PostTags(new Post({}), new Tag({})),
        ];

        try {
            return await this._graphRepository.generateNewGraph(name, relations);
        } catch {
            await this._graphRepository.dropGraph(name);
            return await this._graphRepository.generateNewGraph(name, relations);
        } 
    }
}

export default GenerateGraphService;