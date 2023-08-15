import Community from "../../entity/Community";

export type UpdateCommunityAvatarServiceDTO = {
    community: Community;
    fileData: string;
    type: string;
}