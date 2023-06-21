import IService from "@common/service/IService";
import IPostRepository from "../../repository/IPostRepository";
import { CreatePostTagServiceDTO } from "./CreatePostTagServiceDTO";


class CreatePostTagService implements IService {
    constructor (private readonly _postRepository: IPostRepository) {}

    public async execute(data: CreatePostTagServiceDTO): Promise<void> {
        const { post, tag } = data;
        await this._postRepository.savePostTag(post, tag);
    }
}

export default CreatePostTagService;