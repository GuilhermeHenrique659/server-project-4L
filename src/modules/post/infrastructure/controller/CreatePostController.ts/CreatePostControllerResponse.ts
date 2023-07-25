import Post from "@modules/post/domain/entity/Post";
import User from "@modules/user/domain/entity/User";

export type CreatePostControllerResponse = Omit<Post, 'user'> & {
    user: Partial<User>
}