import IService from "@common/service/IService";
import IPostRepository from "../../repository/IPostRepository";
import { CreatePostTagServiceDTO } from "./CreatePostTagServiceDTO";
import PostTags from "../../entity/PostTags";
import { inject, injectable } from "tsyringe";
import { Repository } from "@common/emun/InjectionsEmun";

@injectable()
class CreatePostTagService implements IService {
    constructor(@inject(Repository.PostRepository) private readonly _postRepository: IPostRepository) { }

    public async execute(data: CreatePostTagServiceDTO): Promise<void> {
        const { post, tag } = data;

        const postTags = new PostTags(post, tag)
        await this._postRepository.savePostTag(postTags);
    }
}

export default CreatePostTagService;