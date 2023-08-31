import File from "@modules/file/domain/entity/File";

export type CreateCommentControllerInputDTO = {
    postId: string;
    content: string;
}

export type CreateCommentControllerOutputDTO = {
    id: string;
    content: string;
    user: {
        id: string;
        name: string;
        avatar?: File
    }
}