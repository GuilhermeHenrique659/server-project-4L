import IService from "@common/service/IService";
import { CreatePostServiceDTO } from "./CreatePostServiceDTO";
import Post from "../../entity/Post";
import IUserRepository from "@modules/user/domain/repository/IUserRepository";
import IPostRepository from "../../repository/IPostRepository";
import AppError from "@common/errors/AppError";
import UserPosts from "@modules/user/domain/entity/UserPosts";

class CreatePostService implements IService {
    constructor (private readonly _userRepository: IUserRepository, 
        private readonly _postRepository: IPostRepository) {}

    public async execute(data: CreatePostServiceDTO): Promise<Post> {
        const user = await this._userRepository.findById(data.userId);

        if(!user) throw new AppError('Usuario não encontrado');

        const post = new Post({ content: data.content });
        
        await this._postRepository.save(post);
        
        const userPosts = new UserPosts(user, post)
        await this._userRepository.saveUserPost(userPosts);

        return post;
    }
}

export default CreatePostService;