import Post from "../entity/Post";
import Tag from "@modules/tag/domain/entity/Tag";

interface IPostRepository {
    save(post: Post): Promise<Post>;
    savePostTag(post: Post, tag: Tag): Promise<void>;
}

export default IPostRepository;
