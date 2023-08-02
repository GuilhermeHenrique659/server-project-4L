import IUserRepository from "@modules/user/domain/repository/IUserRepository";
import CreatePostService from "./CreatePostService/CreatePostService";
import IPostRepository from "../repository/IPostRepository";
import CreatePostTagService from "./CreatePostTagService/CreatePostTagService";
import ListRecommendPostService from "./ListRecommendPostService/ListRecommendPostService";
import CreatePostLikedService from "./CreatePostLikedService/CreatePostLikedService";
import IFileRepository from "@modules/file/domain/repository/IFileRepository";
import IFileProvider from "@common/provider/file/IFileProvider";
import CreatePostFileService from "./CreatePostFile/CreatePostFileService";
import ListPostInsideCommunityService from "./ListPostInsideCommunity/ListPostInsideCommunity";

class PostServiceFactory {
    constructor (private readonly _userRepository: IUserRepository,
        private readonly _postRepository: IPostRepository,
        private readonly _fileRepository: IFileRepository,
        private readonly _fileProvider: IFileProvider) {}

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

    public getListCommunityPost() {
        return new ListPostInsideCommunityService(this._postRepository);
    }

    public getCreatePostFile(){
        return new CreatePostFileService(this._postRepository, this._fileRepository, this._fileProvider);
    }
}

export default PostServiceFactory;