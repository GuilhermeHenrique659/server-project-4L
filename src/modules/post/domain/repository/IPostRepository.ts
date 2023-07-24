import Post from "../entity/Post";
import Tag from "@modules/tag/domain/entity/Tag";
import PostTags from "../entity/PostTags";
import UserLiked from "@modules/user/domain/entity/UserLiked";
import PostFiles from "../entity/PostFiles";

interface IPostRepository {
    save(post: Post): Promise<Post>;
    savePostTag(postTags: PostTags): Promise<void>;
    listRecommendPost(userId: string): Promise<Post[]>;
    findById(id: string): Promise<Post | undefined>;
    saveLike(like: UserLiked): Promise<void>;
    savePostFile(postFiles: PostFiles): Promise<void>:
}

export default IPostRepository;
