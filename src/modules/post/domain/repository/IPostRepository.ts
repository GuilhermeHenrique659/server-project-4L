import Post from "../entity/Post";
import Tag from "@modules/tag/domain/entity/Tag";
import PostTags from "../entity/PostTags";

interface IPostRepository {
    save(post: Post): Promise<Post>;
    savePostTag(postTags: PostTags): Promise<void>;
    listRecommendPost(userId: string): Promise<Post[]>;
}

export default IPostRepository;
