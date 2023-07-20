import Tag from "@modules/tag/domain/entity/Tag";

export default interface ICreateUserTagsDTO {
    tags: Tag[];
    userId: string;
}