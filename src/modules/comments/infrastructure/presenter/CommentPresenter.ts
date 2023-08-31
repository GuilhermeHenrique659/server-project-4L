import Comment from "@modules/comments/domain/entity/Comment";
import { CreateCommentControllerOutputDTO } from "../controller/createCommentController/CreateCommentControllerDTO";

class CommentPresenter {
    static createComment({ user, ...comment }: Comment): CreateCommentControllerOutputDTO {
        return {
            ...comment,
            user: {
                id: user.id,
                name: user.name,
                avatar: user.avatar
            }
        }
    }
}

export default CommentPresenter;