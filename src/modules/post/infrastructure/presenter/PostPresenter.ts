import Post from "@modules/post/domain/entity/Post";
import { CreatePostControllerResponse } from "../controller/CreatePostController/CreatePostControllerResponse";

class PostPresenter {
    static createPostPresenter({ user, ...data }: Post): CreatePostControllerResponse {
        return {
            ...data,
            user: {
                id: user.id,
                name: user.name,
                avatar: user.avatar
            }
        }
    }
}

export default PostPresenter