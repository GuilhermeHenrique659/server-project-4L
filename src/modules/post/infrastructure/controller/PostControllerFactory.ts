import PostServiceFactory from "@modules/post/domain/service/PostServiceFactory";
import CreatePostController from "./CreatePostController.ts/CreatePostController";
import TagServiceFactory from "@modules/tag/domain/service/TagServiceFactory";
import GraphServiceFactory from "@modules/graph/domain/service/GraphServiceFactory";
import ListRecommendPostController from "./ListRecommendPostController/ListRecoomendPostController";

class PostControllerFactory {
    constructor (private postServiceFactory: PostServiceFactory,
        private tagServiceFactory: TagServiceFactory,
        private graphServiceFactory: GraphServiceFactory) {}

    public getCreatePostController() {
        return new CreatePostController(this.postServiceFactory, this.tagServiceFactory);
    }

    public getListPostController() {
        return new ListRecommendPostController(this.graphServiceFactory, this.postServiceFactory);
    }
}

export default PostControllerFactory;