import Tag from "@modules/tag/domain/entity/Tag";

export type UpdateUserControllerInputDTO = {
    name?: string;
    email?: string;
    password?: string;
    passwordToConfirm: string;
    avatar?: {
        type: string;
        data: string;
    }
    tags: Tag[];
}