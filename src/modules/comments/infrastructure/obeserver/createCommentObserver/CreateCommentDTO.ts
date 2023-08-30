import Comment from "@modules/comments/domain/entity/Comment";

export type CreateCommentDTO = {
    postId: string;
    comment: Comment;
};