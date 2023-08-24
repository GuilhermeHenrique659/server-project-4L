import IService from "@common/service/IService";
import { CreatePostServiceDTO } from "./CreatePostServiceDTO";
import Post from "../../entity/Post";
import IUserRepository from "@modules/user/domain/repository/IUserRepository";
import IPostRepository from "../../repository/IPostRepository";
import AppError from "@common/errors/AppError";
import UserPosted from "@modules/user/domain/entity/UserPosted";
import { inject, injectable } from "tsyringe";
import { Repository } from "@common/emun/InjectionsEmun";

@injectable()
class CreatePostService implements IService {
    constructor(@inject(Repository.UserRepository) private readonly _userRepository: IUserRepository,
        @inject(Repository.PostRepository) private readonly _postRepository: IPostRepository) { }

    public async execute(data: CreatePostServiceDTO): Promise<Post> {
        const { content, userId } = data;

        const user = await this._userRepository.findById(userId);

        if (!user) throw new AppError('Usuario não encontrado');

        const post = new Post({ content });

        await this._postRepository.save(post);

        const userPosts = new UserPosted(user, post)
        await this._userRepository.saveUserPost(userPosts);

        post.user = user;
        return post;
    }
}

export default CreatePostService;