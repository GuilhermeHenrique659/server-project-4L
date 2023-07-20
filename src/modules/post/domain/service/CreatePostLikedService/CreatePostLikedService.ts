import IService from "@common/service/IService";
import { CreatePostLikedServiceDTO } from "./CreatePostLikedServiceDTO";
import IUserRepository from "@modules/user/domain/repository/IUserRepository";
import IPostRepository from "../../repository/IPostRepository";
import AppError from "@common/errors/AppError";
import UserLiked from "@modules/user/domain/entity/UserLiked";

class CreatePostLikedService implements IService {
    constructor (private readonly _userRepository: IUserRepository,
        private readonly _postRepository: IPostRepository) {}

    public async execute(data: CreatePostLikedServiceDTO) {
        const { userId, postId } = data;

        const user = await this._userRepository.findById(userId);

        if (!user) throw new AppError('User not found', 404);

        const post = await this._postRepository.findById(postId);

        if (!post) throw new AppError('Post not found', 404);

        const like = new UserLiked(user, post);

        await this._postRepository.saveLike(like)
    }
}

export default CreatePostLikedService;