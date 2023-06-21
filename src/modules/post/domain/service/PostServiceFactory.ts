import IUserRepository from "@modules/user/domain/repository/IUserRepository";
import CreatePostService from "./CreatePostService/CreatePostService";
import IPostRepository from "../repository/IPostRepository";
import CreatePostTagService from "./CreatePostTagService/CreatePostTagService";

class PostServiceFactory {
    constructor (private readonly _userRepository: IUserRepository,
        private readonly _postRepository: IPostRepository) {}

    public getCreatePost() {
        return new CreatePostService(this._userRepository, this._postRepository);
    }

    public getCreatePostTag(){
        return new CreatePostTagService(this._postRepository);
    }
}

export default PostServiceFactory;