import { CreateCommentControllerOutputDTO } from "../../controller/createCommentController/CreateCommentControllerDTO";

export type CreateCommentDTO = {
    postId: string;
    comment: CreateCommentControllerOutputDTO;
};