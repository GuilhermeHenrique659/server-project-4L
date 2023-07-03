import IService from "@common/service/IService";
import { IGraphRepository } from "../../repository/IGraphRepository";
import Graph from "../../entity/Graph";
import UserTags from "@modules/user/domain/entity/UserTags";
import User from "@modules/user/domain/entity/User";
import Tag from "@modules/tag/domain/entity/Tag";
import UserPosts from "@modules/user/domain/entity/UserPosts";
import Post from "@modules/post/domain/entity/Post";
import PostTags from "@modules/post/domain/entity/PostTags";


class GenerateGraphService implements IService {
    constructor (private readonly _graphRepository: IGraphRepository ) {}

    public async execute(data: { name: string }): Promise<Graph> {
        const { name } = data

        const relations = [
            new UserTags(new User({}), new Tag({})),
            new UserPosts(new User({}), new Post({})),
            new PostTags(new Post({}), new Tag({}))
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