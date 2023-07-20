import Post from "../entity/Post";
import Tag from "@modules/tag/domain/entity/Tag";
import PostTags from "../entity/PostTags";
import UserLiked from "@modules/user/domain/entity/UserLiked";

interface IPostRepository {
    save(post: Post): Promise<Post>;
    savePostTag(postTags: PostTags): Promise<void>;
    listRecommendPost(userId: string): Promise<Post[]>;
    findById(id: string): Promise<Post | undefined>;
    saveLike(like: UserLiked): Promise<void>;
}

export default IPostRepository;
