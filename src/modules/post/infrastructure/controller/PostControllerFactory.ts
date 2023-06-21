import PostServiceFactory from "@modules/post/domain/service/PostServiceFactory";
import CreatePostController from "./CreatePostController.ts/CreatePostController";
import TagServiceFactory from "@modules/tag/domain/service/TagServiceFactory";

class PostControllerFactory {
    constructor (private postServiceFactory: PostServiceFactory,
        private tagServiceFactory: TagServiceFactory) {}

    public getCreatePostController() {
        return new CreatePostController(this.postServiceFactory, this.tagServiceFactory);
    }
}

export default PostControllerFactory;