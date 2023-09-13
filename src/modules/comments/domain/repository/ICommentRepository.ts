import Comment from "../entity/Comment";
import CommentUser from "../entity/CommentUser";

interface ICommentRepository {
    save(comment: Comment): Promise<Comment>;
    saveCommentUser(commentUser: CommentUser): Promise<void>;
    get(postId: string): Promise<Comment[]>;
    remove(id: string): Promise<void>;
}

export default ICommentRepository;