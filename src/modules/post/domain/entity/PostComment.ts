import IEdge from "@common/database/datasource/types/IEdge";
import Post from "./Post";
import Comment from "@modules/comments/domain/entity/Comment";

class PostComment implements IEdge {
    public readonly label: string;

    public from?: Post;

    public to?: Comment;

    constructor(from?: Post, to?: Comment) {
        this.label = 'HAS';
        this.from = from;
        this.to = to;
    }
}

export default PostComment;