import { fileData } from "@common/provider/file/IFileProvider";
import Community from "@modules/community/domain/entity/Community";
import File from "@modules/file/domain/entity/File";
import Tag from "@modules/tag/domain/entity/Tag";
import User from "@modules/user/domain/entity/User";

export type CreateCommunityRequestDTO = {
    name: string;
    description: string;
    cover?: fileData;
    avatar?: fileData;
    tags?: Tag[];
}

export type CreateCommunityResponseDTO = Omit<Community, 'admin'> & {
    admin: {
        id: string,
        name: string,
        avatar?: File
    }}