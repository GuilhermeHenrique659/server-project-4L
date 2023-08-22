import PostServiceFactory from "@modules/post/domain/service/PostServiceFactory";
import CreatePostController from "./CreatePostController.ts/CreatePostController";
import TagServiceFactory from "@modules/tag/domain/service/TagServiceFactory";
import GraphServiceFactory from "@modules/graph/domain/service/GraphServiceFactory";
import ListRecommendPostController from "./ListRecommendPostController/ListRecoomendPostController";
import CreatePostLikedController from "./CreateUserLikedController.ts/CreateUserLikedController";
import ISubject from "@common/observer/ISubject";
import CommunityServiceFactory from "@modules/community/domain/service/CommunityServiceFactory";
import IUserRepository from "@modules/user/domain/repository/IUserRepository";
import UserServiceFactory from "@modules/user/domain/service/UserServiceFactory";

class PostControllerFactory {
    constructor (private postServiceFactory: PostServiceFactory,
        private tagServiceFactory: TagServiceFactory,
        private graphServiceFactory: GraphServiceFactory,
        private communityServiceFactory: CommunityServiceFactory,
        private likeSuject: ISubject,
        private createPostSubject: ISubject,
        private userServices: UserServiceFactory) {}

    public getCreatePostController() {
        return new CreatePostController(this.postServiceFactory, this.tagServiceFactory, this.communityServiceFactory, this.userServices, this.createPostSubject);
    }

    public getListPostController() {
        return new ListRecommendPostController(this.graphServiceFactory, this.postServiceFactory);
    }

    public getCreateLikeController() {
        return new CreatePostLikedController(this.postServiceFactory, this.likeSuject);
    }
}

export default PostControllerFactory;