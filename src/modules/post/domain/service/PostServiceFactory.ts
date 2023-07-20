import IUserRepository from "@modules/user/domain/repository/IUserRepository";
import CreatePostService from "./CreatePostService/CreatePostService";
import IPostRepository from "../repository/IPostRepository";
import CreatePostTagService from "./CreatePostTagService/CreatePostTagService";
import ListRecommendPostService from "./ListRecommendPostService/ListRecommendPostService";
import CreatePostLikedService from "./CreatePostLikedService/CreatePostLikedService";

class PostServiceFactory {
    constructor (private readonly _userRepository: IUserRepository,
        private readonly _postRepository: IPostRepository) {}

    public getCreatePost() {
        return new CreatePostService(this._userRepository, this._postRepository);
    }

    public getCreatePostTag(){
        return new CreatePostTagService(this._postRepository);
    }

    public getCreateLiked(){
        return new CreatePostLikedService(this._userRepository, this._postRepository);
    }

    public getListPost(){
        return new ListRecommendPostService(this._postRepository);
    }
}

export default PostServiceFactory;