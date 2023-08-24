import Post from "../entity/Post";
import Tag from "@modules/tag/domain/entity/Tag";
import PostTags from "../entity/PostTags";
import UserLiked from "@modules/user/domain/entity/UserLiked";
import PostFiles from "../entity/PostFiles";

interface IPostRepository {
    save(post: Post): Promise<Post>;
    savePostTag(postTags: PostTags): Promise<void>;
    listRecommendPost(userId: string, page: number, limit: number, useAlgorithmic?: boolean): Promise<Post[]>;
    findById(id: string): Promise<Post | undefined>;
    hasUserLiked(like: UserLiked): Promise<boolean>;
    saveLike(like: UserLiked): Promise<void>;
    savePostFile(postFiles: PostFiles): Promise<void>;
    listPostCommunity(userId: string, page: number, limit: number, communityId: string): Promise<Post[]>;
}

export default IPostRepository;
