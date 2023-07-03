import IEdge from "@common/database/datasource/types/IEdge";
import Post from "./Post";
import Tag from "@modules/tag/domain/entity/Tag";

class PostTags implements IEdge {
    public readonly label: string; 

    public readonly from: Post;

    public readonly to: Tag

    constructor (from: Post, to: Tag) {
        this.label = 'TAGGED';
        this.from = from;
        this.to = to;
    }
}

export default PostTags;